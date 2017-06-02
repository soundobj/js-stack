import config from "../../config/config";

function fetchUser(user) {
  return function (dispatch) {
    dispatch({ type: "FETCH_USER", payload: null });
    return fetch(`${config.api}/login?user=${user.user}&password=${user.password}`, { credentials: "include" })
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        dispatch({
          type: "FETCH_USER_FULFILLED",
          payload: user,
        });
      })
      .catch((ex) => {
        dispatch({ type: "FETCH_USER_REJECTED", payload: ex });
      });
  };
}

function logout() {
  return function (dispatch) {
    dispatch({ type: "LOGOUT_USER", payload: null });
    dispatch({ type: "CLEAR_NOTES", payload: null });
  };
}

module.exports.fetchUser = fetchUser;
module.exports.logout = logout;