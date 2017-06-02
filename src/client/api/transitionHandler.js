import BrowserCookies from "browser-cookies";
import store from "../store";
import { fetchUser } from "../components/user/user-actions";

export default function (nextState, replace, callback) {
  const authUser = BrowserCookies.get("user");
  const state = store.getState().toJS();

  if (!authUser) {
    // redirect to login if not user cookie found
    replace(`/login?from=${nextState.location.pathname}${nextState.location.search}`);
    callback();
  } else if (!state.user.role) {
    // update the user store if empty
    store.dispatch(fetchUser({ user: authUser })).then(() => {
      callback();
    }).catch((e) => {
      // handle any error fetching the user
      console.error("TODO: show notification: Could not fetch user", e);
    });
  } else {
    // user has cookie and store data, continue as usual
    callback();
  }
}