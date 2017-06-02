import Immutable from "immutable";

const initialState = Immutable.Map({
  isSuccess: null,
  message: null,
  show: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case "NOTIFY_STATUS": {
      return state.withMutations((map) => {
        map
          .set("isSuccess", action.payload.isSuccess)
          .set("message", action.payload.message)
          .set("show", action.payload.show);
      });
    }
    case "REMOVE_STATUS": {
      return state.withMutations((map) => {
        map
            .set("isSuccess", false)
            .set("message", undefined)
            .set("show", false);
      });
    }
    default: {
      return state;
    }
  }
}