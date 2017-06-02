import Immutable from "immutable";
import { updateObjectListByProperty } from "../../api/immutable-utils";

const initialState = Immutable.Map({
  notes: Immutable.List(),
  links: {},
  fetching: false,
  fetched: false,
  error: null,
  status: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case "FETCH_NOTES": {
      return state.withMutations((map) => {
        map
          .set("fetching", true);
      });
    }
    case "FETCH_NOTES_REJECTED": {
      return state.withMutations((map) => {
        map
          .set("fetching", false)
          .set("fetched", true)
          .set("notes", Immutable.List())
          .set("links", {})
          .set("status", action.payload.status)
          .set("error", action.payload.error);
      });
    }
    case "FETCH_NOTES_FULFILLED": {
      let _state;

      if (state.toJS().notes.length && action.payload.payload.length) {
        _state = updateObjectListByProperty(state, "notes", action.payload.payload.length);
      } else if (!state.toJS().notes.length && action.payload.payload.length) {
        _state = state.withMutations((map) => {
          map.set("notes", new Immutable.List(Immutable.fromJS(action.payload.payload)));
        });
      }

      return _state.withMutations((map) => {
        map
          .set("links", action.payload.links)
          .set("fetching", false)
          .set("status", 200)
          .set("fetched", true);
      });
    }
    case "CLEAR_NOTES": {
      return state.withMutations((map) => {
        map
          .set("notes", Immutable.List())
          .set("links", {})
          .set("fetching", false)
          .set("status", null)
          .set("fetched", true);
      });
    }
    case "EDIT_NOTE_FULFILLED": {
      const _state = updateObjectListByProperty(state, "notes", [action.payload.payload]);
      return _state.withMutations((map) => {
        map
          .set("fetching", false)
          .set("status", null)
          .set("fetched", true);
      });
    }
    case "COMPARE_VERSION_FULFILLED": {
      const _state = updateObjectListByProperty(state, "notes", [action.payload.payload]);
      return _state.withMutations((map) => {
        map
          .set("fetching", false)
          .set("status", null)
          .set("fetched", true);
      });
    }

    case "EDIT_NOTE_REJECTED": {
      return state.withMutations((map) => {
        map
          .set("fetching", false)
          .set("status", null)
          .set("fetched", true);
      });
    }
    case "EDIT_NOTE": {
      return state.withMutations((map) => {
        map
          .set("fetching", false)
          .set("status", null)
          .set("fetched", true);
      });
    }
    case "ADD_NOTE_FULFILLED": {
      const _state = updateObjectListByProperty(state, "notes", [action.payload.payload]);
      return _state.withMutations((map) => {
        map
          .set("fetching", false)
          .set("status", null)
          .set("fetched", true);
      });
    }
    case "ADD_NOTE_REJECTED": {
      return state.withMutations((map) => {
        map
          .set("fetching", false)
          .set("status", null)
          .set("fetched", true);
      });
    }
    case "ADD_NOTE": {
      return state.withMutations((map) => {
        map
          .set("fetching", true)
          .set("status", null)
          .set("fetched", false);
      });
    }

    default: {
      return state;
    }
  }
}