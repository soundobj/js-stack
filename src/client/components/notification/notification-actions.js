export function pushNotification(payload) {
  return function (dispatch) {
    dispatch({ type: "PUSH_NOTIFICATION", payload });
  };
}

export function clearNotifications() {
  return function (dispatch) {
    dispatch({ type: "CLEAR_NOTIFICATIONS" });
  };
}