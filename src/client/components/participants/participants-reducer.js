import Immutable from "immutable";

const initialState = Immutable.Map({
  participants: [],
  fetching: false,
  fetched: false,
  error: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case "FETCH_PARTICIPANTS": {
      return state.withMutations((map) => {
        map
          .set("fetching", true);
      });
    }
    case "FETCH_PARTICIPANTS_REJECTED": {
      return state.withMutations((map) => {
        map
          .set("fetching", false)
          .set("fetched", true)
          .set("participants", [])
          .set("error", action.payload.error);
      });
    }
    case "FETCH_PARTICIPANTS_FULFILLED": {
      return state.withMutations((map) => {
        map
          .set("participants", action.payload.payload)
          .set("fetching", false)
          .set("status", 200)
          .set("fetched", true);
      });
    }
    case "CLEAR_PARTICIPANTS": {
      return state.withMutations((map) => {
        map
          .set("participants", [])
          .set("fetching", false)
          .set("status", null)
          .set("fetched", false);
      });
    }
    default: {
      return state;
    }
  }
}