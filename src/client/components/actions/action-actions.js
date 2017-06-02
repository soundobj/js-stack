/*
 *
 * All rights reserved. Copyright (c) Ixxus Ltd 2015
 *
 * @author Matt Dunn
 *
 */

/**
 * @module Actions
 */

export function execAction(payload) {
  console.error("@ execAction", payload);
  return function (dispatch) {
    console.error("@  execAction dispatch", payload);
    dispatch({ type: "EXEC_ACTION", payload });
  };
}

export function completeAction(payload) {
  return function (dispatch) {
    console.error("@ action actions completeAction payload", payload);
    dispatch({ type: "COMPLETE_ACTION", payload });
  };
}

export function completeActionAll(payload) {
  return function (dispatch) {
    console.error("@ action actions completeAction all payload", payload);
    dispatch({ type: "COMPLETE_ACTION_ALL", payload });
  };
}