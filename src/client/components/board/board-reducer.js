import Immutable from "immutable";
// import { updateObjectListByProperty } from "../../api/immutable-utils";

const initialState = Immutable.Map({
  items: Immutable.List(),
  columns: [],
  fetching: false,
  fetched: false,
  error: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case "FETCH_BOARD": {
      return state.withMutations((map) => {
        map
          .set("fetching", true);
      });
    }
    case "FETCH_BOARD_REJECTED": {
      return state.withMutations((map) => {
        map
          .set("fetching", false)
          .set("fetched", true)
          .set("items", Immutable.List())
          .set("columns", [])
          .set("error", action.payload.error);
      });
    }
    // case "FETCH_BOARD_FULFILLED": {
    //   return state.withMutations((map) => {
    //     map
    //       .set("items", new Immutable.List(Immutable.fromJS(action.payload.payload.items)))
    //       .set("columns", action.payload.payload.columns)
    //       .set("fetching", false)
    //       .set("status", 200)
    //       .set("fetched", true);
    //   });
    // }
    default: {
      return state;
    }
  }
}