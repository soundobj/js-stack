import Immutable from "immutable";
import _ from "lodash";

/**
 * Check if the current action step is a function if so instantiate the component with the supplied context.
 * @param {React Component | function} actionComponent
 * @param {Object} props
 * @returns {*}
 */
function initActionComponent(actionComponent, props) {
  const handler = actionComponent;
  let component;
  if (_.isFunction(handler)) {
    component = handler(props);
  } else {
    component = handler;
  }
  return component;
}

const initialState = Immutable.Map({
  action: null, // the current action
  disabled: undefined,
  currentIndex: null, // the current action item index
  current: null, // the current action item , actions can have multiple action items
  payload: {}, // any action generated data that needs to be persisted
  handlers: {}, // map of available application handlers
  context: {}, // any data that is shareable among action items
});

export default function (state = initialState, action) {
  switch (action.type) {
    case "REGISTER_ACTION": {
      const actions = state.toJS().handlers;

      if (actions[action.payload.name]) {
        throw new Error(`Action handler with name ${action.payload.name} already registered`);
      } else {
        actions[action.payload.name] = action.payload.action;
        return state.withMutations((map) => {
          map.set("handlers", actions);
        });
      }
    }
    case "DISABLE_ACTION": {
      return state.withMutations((map) => {
        map.set("disabled", action.payload);
      });
    }
    case "INIT_ACTION": {
      const handlers = state.toJS().handlers;
      if (!handlers[action.payload.id]) {
        throw new Error(`Could not find handler with name ${action.payload.id}`);
      } else {
        return state.withMutations((map) => {
          map
            .set("action", handlers[action.payload.id])
            .set("currentIndex", 0)
            .set("current", initActionComponent(handlers[action.payload.id].items[0], action.payload.context))
            .set("context", action.payload.context)
          ;
        });
      }
    }
    case "NEXT_ACTION": {
      const _state = state.toJS();
      if (!_state.action) {
        throw new Error("Cannot next() when there is not action initialised");
      } else if (_state.action.items.length - 1 === _state.currentIndex) {
        console.error("@ reached end of action items", null);
        return state;
      } else {
        return state.withMutations((map) => {
          map
            .set("currentIndex", _state.currentIndex + 1)
            .set("current", initActionComponent(_state.action.items[_state.currentIndex + 1]))
          ;
        });
      }
    }
    case "COMPLETE_ACTION": {
      const _state = state.toJS();
      if (!_state.action) {
        throw new Error("Cannot complete() when there is not action initialised");
      } else {
        return state.withMutations((map) => {
          map
            .set("currentIndex", null)
            .set("current", null)
            .set("action", null)
            .set("payload", {})
            .set("context", {})
          ;
        });
      }
    }
    case "CANCEL_ACTION": {
      const _state = state.toJS();
      if (!_state.action) {
        throw new Error("Cannot cancel() when there is not action initialised");
      } else {
        return state.withMutations((map) => {
          map
            .set("currentIndex", null)
            .set("current", null)
            .set("action", null)
            .set("payload", {})
            .set("context", {})
          ;
        });
      }
    }
    case "ADD_ACTION_PAYLOAD": {
      const payload = state.toJS().payload;
      payload[action.payload.key] = action.payload.payload;
      return state.withMutations((map) => {
        map.set("payload", payload);
      });
    }
    default: {
      return state;
    }
  }
}