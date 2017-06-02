import { Record } from "immutable";

import {
  GET_LISTS_START,
  MOVE_CARD,
  MOVE_LIST,
  TOGGLE_DRAGGING,
} from "./lists-actions";

/* eslint-disable new-cap */
const InitialState = Record({
  fetching: false,
  fetched: false,
  lists: [],
  isDragging: false,
});
/* eslint-enable new-cap */
const initialState = new InitialState();

export default function lists(state = initialState, action) {
  switch (action.type) {
    case GET_LISTS_START:
      return state.set("fetching", true);
    case "FETCH_BOARD_FULFILLED":
      return state.withMutations((map) => {
        map
          .set("fetching", false)
          .set("fetched", true)
          .set("lists", action.payload.payload.columns);
      });
    case MOVE_CARD: {
      const newLists = [...state.lists];
      const { lastX, lastY, nextX, nextY, item } = action;
      if (lastX === nextX) {
        newLists[lastX].cards.splice(nextY, 0, newLists[lastX].cards.splice(lastY, 1)[0]);
      } else {
        // move element to new place
        newLists[nextX].cards.splice(nextY, 0, item);
        // newLists[nextX].cards.splice(nextY, 0, newLists[lastX].cards[lastY]);
        // delete element from old place
        newLists[lastX].cards.splice(lastY, 1);
      }
      return state.withMutations((ctx) => {
        ctx.set("lists", newLists);
      });
    }
    case MOVE_LIST: {
      const newLists = [...state.lists];
      const { lastX, nextX } = action;
      const t = newLists.splice(lastX, 1)[0];

      newLists.splice(nextX, 0, t);

      return state.withMutations((ctx) => {
        ctx.set("lists", newLists);
      });
    }
    case "PUSH_ITEM": {
      const newLists = [...state.lists];
      const { card, column } = action.payload;
      newLists[newLists.findIndex(x => x.id === column)].cards.push(card);
      return state.withMutations((ctx) => {
        ctx.set("lists", newLists);
      });
    }
    case TOGGLE_DRAGGING: {
      return state.set("isDragging", action.isDragging);
    }
    default:
      return state;
  }
}