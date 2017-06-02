import store from "../../store";
import { execAction } from "../../api/action-utils";

export function editNote(note) {
  return function () {
    const action = store.getState().toJS().user.links.find(x => x.action === "EDIT_NOTE");
    if (action) {
      return execAction(action, note, { id: note.id });
    }
    return new Promise(reject => reject("Forbidden"));
  };
}