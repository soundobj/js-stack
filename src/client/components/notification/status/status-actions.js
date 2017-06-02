/**
 * @module Status
 */

export function notifyStatus(payload) {
  return function (dispatch) {
    dispatch({ type: "NOTIFY_STATUS", payload });
    return new Promise((resolve) => { resolve(); });
  };
}

export function removeStatus() {
  return function (dispatch) {
    dispatch({ type: "REMOVE_STATUS", payload: null });
  };
}