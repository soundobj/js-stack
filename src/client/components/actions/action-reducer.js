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
import Immutable from "immutable";

const initialState = Immutable.Map({
  /**
   * Current action
   *
   * @property state.currentAction
   * @type {Action|null}
   */
  currentAction: null,

  /**
   * @property state.hasCurrentAction
   * @type {Boolean}
   */
  hasCurrentAction: false,

  /**
   * @property state.component
   * @type {null|React.Element}
   */
  component: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case "EXEC_ACTION": {
      return state.withMutations((map) => {
        map
          .set("currentAction", action.payload.action)
          .set("hasCurrentAction", action.payload.action !== undefined && action.payload.action !== null)
          .set("component", action.payload.component);
      });
    }
    case "COMPLETE_ACTION": {
      return state.withMutations((map) => {
        map
          .set("component", null)
          .set("currentAction", null)
          .set("hasCurrentAction", false);
      });
    }
    case "COMPLETE_ACTION_ALL": {
      return state.withMutations((map) => {
        map
          .set("component", null)
          .set("currentAction", null)
          .set("hasCurrentAction", false);
      });
    }
    default: {
      return state;
    }
  }
}