import store from "../../store";
import { execAction } from "../../api/action-utils";
import { pushNotification } from "../notification/notification-actions";

export function fetchNotes(link) {
  return function () {
    const action = store.getState().toJS().user.links.find(x => x.action === "FETCH_NOTES");
    if (action) {
      return execAction(action, null, null, link && link.url, true);
    }
    const error = { status: 403, error: "Forbidden" };
    store.dispatch(pushNotification(error));
    store.dispatch({ type: "FETCH_NOTES_REJECTED", payload: error });
    return new Promise(reject => reject("Forbidden"));
  };
}