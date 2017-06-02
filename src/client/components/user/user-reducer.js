import Immutable from "immutable";
import { isEmpty } from "../../api/val-utils";

const initialState = Immutable.Map({
  user: undefined,
  links: [],
  role: undefined,
  socket: undefined,
  fetching: false,
  fetched: false,
  error: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case "FETCH_USER": {
      return state.withMutations((map) => {
        map
          .set("fetching", true);
      });
    }
    case "FETCH_USER_REJECTED": {
      return state.withMutations((map) => {
        map
          .set("fetching", false)
          .set("error", action.payload);
      });
    }
    case "FETCH_USER_FULFILLED": {
      return state.withMutations((map) => {
        const userNotFound = isEmpty(action.payload.user);
        map
          .set("user", userNotFound ? undefined : action.payload.user)
          .set("links", action.payload.links || [])
          .set("fetching", false)
          .set("error", userNotFound ? "login.error.user.not.found" : null)
          .set("fetched", true)
          .set("role", action.payload.role)
          .set("socket", action.payload.socket);
      });
    }
    case "LOGOUT_USER": {
      // remove the cookie from the client
      document.cookie = "user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      return state.withMutations((map) => {
        map
          .set("user", undefined)
          .set("error", null);
      });
    }
    default: {
      return state;
    }
  }
}