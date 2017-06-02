import React from "react";
import { execAction } from "../../../../api/action-utils";
import { marshalObject } from "../../../../api/val-utils";
import Form from "../../../form/form";
import Participants from "../../../participants/participants-container";
import Dialog from "../../../dialog/dialog";
import Confirm from "../../../confirm/confirm";
import store from "../../../../store";
import { notifyStatus } from "../../../notification/status/status-actions";
import { next, cancelAction, completeAction, addActionPayload } from "../../action-actions";

const schema = {
  title: "Note",
  type: "object",
  required: ["text", "author.participant.name"],
  properties: {
    text: { type: "string", title: "Note", default: "#fake notes" },
    "author.participant.name": { type: "string", title: "author", default: "Author" },
    "author.participant.email": { type: "string", title: "email", default: "author@ixxus.com" },
    "author.participant.address.streetName": { type: "string", title: "Street Name", default: "Aladin Author Street" },
    "author.participant.address.streetAddress": { type: "string", title: "Street Address", default: "630" },
    "author.participant.address.country": { type: "string", title: "Country", default: "United Kingdom" },
  },
};

function _cancelAction() {
  store.dispatch(cancelAction());
}

function onFormSubmit(formData) {
  store.dispatch(addActionPayload({ key: "note", payload: formData.formData }));
  store.dispatch(next());
}

const form = (
  <Dialog
    open={true}
    onClose={_cancelAction}
    title="Please fill Note"
    actions={[{ label: "cancel" }]}
  >
    <Form schema={schema} onSubmit={onFormSubmit} />
  </Dialog>
);

function onConfirmComplete() {
  const state = store.getState().toJS();
  execAction(state.user.links.find(x => x.action === "ADD_NOTE"),
    marshalObject(Object.assign({ versions: [] }, state._action.payload.note, state._action.payload.assignee)))
    .then(() => {
      store.dispatch(next());
    })
    .catch((ex) => {
      _cancelAction();
      throw new Error("Could not create note", ex);
    });
}

function onAssigneeSelected(assignee) {
  store.dispatch(addActionPayload({
    key: "assignee",
    payload: {
      "assignedTo.participant.name": assignee.name,
      "assignedTo.participant.surname": assignee.surname,
      "assignedTo.participant.id": assignee.id,
      "assignedTo.participant.email": assignee.email,
      "assignedTo.participant.address.streetName": assignee.address.streetName,
      "assignedTo.participant.address.streetAddress": assignee.address.streetAddress,
      "assignedTo.participant.address.country": assignee.address.country,
      "assignedTo.participant.address.postcode": assignee.address.postcode,
    },
  }));
  store.dispatch(next());
}

const assignParticipant = (
  <Dialog
    open={true}
    onClose={_cancelAction}
    title="Please Choose Assignee"
    actions={[{ label: "cancel" }]}
  >
    <Participants action="Select" onSelection={onAssigneeSelected} />
  </Dialog>
);

const confirm = (
  <Confirm
    title="Are you sure?"
    onComplete={onConfirmComplete}
    onCancel={_cancelAction}
  >
    <p>What do you reckon?</p>
  </Confirm>
);

function success() {
  // return a function as the reducer will execute action step that are functions to bestow them with context and state
  return () =>
    store.dispatch(notifyStatus({
      isSuccess: true,
      message: "Successfully Added Note",
      show: true,
    })).then(() => {
      store.dispatch(next());
    });
}

function done() {
  return () => store.dispatch(completeAction());
}

module.exports.addNote = {
  id: "addNote",
  payload: ["note"],
  items: [form, assignParticipant, confirm, success, done],
};