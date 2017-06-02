import store from "../../store";
import { execAction } from "../../api/action-utils";

export function fetchBoard() {
  return function () {
    const action = store.getState().toJS().user.links.find(x => x.action === "FETCH_BOARD");
    if (action) {
      return execAction(action);
    }
    return new Promise(reject => reject("Forbidden"));
  };
}