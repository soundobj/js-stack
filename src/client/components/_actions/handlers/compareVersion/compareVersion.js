import React from "react";
import _ from "lodash";
import DiffTool from "../../../diffTool/diffTool-container";
import Dialog from "../../../dialog/dialog-container";
import Confirm from "../../../confirm/confirm";
import store from "../../../../store";
import { notifyStatus } from "../../../notification/status/status-actions";
import { completeAction, addActionPayload, next, cancelAction } from "../../action-actions";
import { revertChanges } from "../../../../api/diffTool-utils";
import { execAction } from "../../../../api/action-utils";
import "./compareVersion.scss";

const diffTool = (context) => {
  const onClose = () => {
    store.dispatch(completeAction());
    if (_.isFunction(context.cancel)) {
      context.cancel();
    }
  };

  return (
    <Dialog
      open={true}
      title="Compare Versions"
      actions={[
        {
          label: "Close",
          action: onClose,
        },
        {
          id: "compareVersion",
          label: "Save Changes",
          action: () => {
            store.dispatch(addActionPayload({
              payload: revertChanges(store.getState().toJS()._action.payload.parts),
              key: "merge",
            }));
            store.dispatch(next());
          },
          disabled: true,
        },
      ]}
    >
      <DiffTool {...context} />
    </Dialog>
  );
};

const confirm = () => {
  const state = store.getState().toJS()._action;
  return (
    <Confirm
      title="Are you sure?"
      onComplete={() => {
        const parent = state.context.versions.find(x => x.isParent === true);
        const action = state.context.action;
        // restore decorated note and update text
        delete parent.isParent;
        parent.text = state.payload.merge;

        execAction(action, parent, { id: parent.id })
          .then(() => {
            store.dispatch(next());
          })
          .catch(() => {
            store.dispatch(cancelAction());
          });
      }}
      onCancel={() => { store.dispatch(cancelAction); }}
    >
      <p>Do you want to save these changes to note?</p>
      <div className="compare-version__merge">{state.payload.merge}</div>
    </Confirm>
  );
};

function success() {
  // return a function as the reducer will execute function action steps to bestow them with context and state
  return () => {
    store.dispatch(notifyStatus({
      isSuccess: true,
      message: "Successfully Edited Note",
      show: true,
    })).then(() => {
      store.dispatch(next());
    });
  };
}

function complete() {
  return () => {
    const onComplete = store.getState().toJS()._action.context.onComplete;
    if (_.isFunction(onComplete)) {
      onComplete();
    }
    store.dispatch(completeAction());
  };
}

module.exports.compareVersion = {
  id: "compareVersion",
  payload: null,
  items: [diffTool, confirm, success, complete],
};