import store from "../../store";
import { execAction } from "../../api/action-utils";

export const GET_LISTS_START = "GET_LISTS_START";
export const MOVE_CARD = "MOVE_CARD";
export const MOVE_LIST = "MOVE_LIST";
export const TOGGLE_DRAGGING = "TOGGLE_DRAGGING";

export function getLists() {
  return function () {
    const action = store.getState().toJS().user.links.find(x => x.action === "FETCH_BOARD");
    if (action) {
      return execAction(action);
    }
    return new Promise(reject => reject("Forbidden"));
  };
}

export function moveList(lastX, nextX) {
  return (dispatch) => {
    dispatch({ type: MOVE_LIST, lastX, nextX });
  };
}

export function moveCard(lastX, lastY, nextX, nextY, item) {
  const action = store.getState().toJS().user.links.find(x => x.action === "MOVE_BOARD_ITEM");
  if (action) {
    execAction(action, item, { lastX, lastY, nextX, nextY });
  }

  return (dispatch) => {
    dispatch({ type: MOVE_CARD, lastX, lastY, nextX, nextY, item });
  };
}

export function toggleDragging(isDragging) {
  return (dispatch) => {
    dispatch({ type: TOGGLE_DRAGGING, isDragging });
  };
}

export function pushItem(payload) {
  return (dispatch) => {
    dispatch({ type: "PUSH_ITEM", payload });
  };
}