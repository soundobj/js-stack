import store from "../../store";
import { pushNotification } from "../notification/notification-actions";
import { execAction } from "../../api/action-utils";

export function fetchParticipants() {
  return function () {
    const action = store.getState().toJS().user.links.find(x => x.action === "FETCH_PARTICIPANTS");
    if (action) {
      return execAction(action);
    }
    const error = { status: 403, error: "Forbidden" };
    store.dispatch(pushNotification(error));
    store.dispatch({ type: "FETCH_PARTICIPANTS_REJECTED", payload: error });
    return new Promise(reject => reject("Forbidden"));
  };
}
module.exports.fetchParticipants = fetchParticipants;