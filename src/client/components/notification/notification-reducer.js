import Immutable from "immutable";

const initialState = Immutable.Map({
  notifications: [],
});

export default function (state = initialState, action) {
  switch (action.type) {
    case "PUSH_NOTIFICATION": {
      return state.withMutations((map) => {
        map
          .set("notifications", Array.isArray(action.payload) ? action.payload : [action.payload]);
      });
    }
    case "CLEAR_NOTIFICATIONS": {
      return state.withMutations((map) => {
        map
          .set("notifications", []);
      });
    }
    default: {
      return state;
    }
  }
}