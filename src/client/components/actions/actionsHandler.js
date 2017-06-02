/*
 *
 * All rights reserved. Copyright (c) Ixxus Ltd 2015
 *
 * @author Matt Dunn
 *
 */

/* eslint-disable */

import Q from "q";
import _ from "lodash";
import React from "react";
import shallowCompare from "react-addons-shallow-compare";
// import IntlMixin from "react-intl";
import Actions from "./actions";
import { execAction, completeAction, completeActionAll } from "./action-actions";
// import ActionStore from "../../store";

// ActionActions
// ActionStore
// "./actionActions",
//   "./actionStore"

/**
 * Get Actions with valid handlers and optionally sort by priority if set in actionProps.priority
 * @method getActionsWithValidHandler
 * @param {Object} ActionHandlers
 * @param {Array.<Object>|Array.<Action>} actions
 * @param {Object} [filter]
 * @param {Object} [filter.exclude]
 * @param {Object} [filter.include]
 * @returns {Array.<Action>|undefined}
 */
function getActionsWithValidHandler(ActionHandlers, actions, filter) {
  if (!ActionHandlers) {
    throw new Error("No handlers have been configured. Make sure ActionHandler.setActionHandlers has been called.");
  }

  filter = filter || {};

  return _.sortBy(_.filter(actions || [], function (action) {
    return ActionHandlers[action.code] !== undefined && (!filter.exclude || !isMatch(action, filter.exclude)) && isMatch(action, filter.include);
  }), function (action) {
    return -(ActionHandlers[action.code].actionProps || {}).priority;
  });
}

/**
 * Test if action matches a filter set
 * @param {Action} action
 * @param {Object} filters
 * @returns {boolean}
 */
function isMatch(action, filters) {
  if (filters) {
    var isMatch = true;

    _.forEach(filters, function (filter, property) {
      if (!_.isArray(filter)) {
        filter = [filter];
      }

      if (isMatch) {
        isMatch = filter.indexOf(action[property]) !== -1;
      }
    });

    return isMatch;
  }

  return true;
}

/**
 * ActionsHandler Component
 *
 * @class ActionsHandler
 * @constructor
 * @return {Function}
 */
var ActionsHandler = React.createClass({
  displayName: "Components.ActionsHandler",

  propTypes: {},

  // mixins: [IntlMixin],

  shouldComponentUpdate: function(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  },

  /**
   * @method
   * @protected
   */
  getInitialState: function () {
    return {
      action: ActionStore.getState().toJS()
    };
  },

  /**
   * @method
   * @protected
   */
  componentWillMount: function () {
    ActionStore.listen(this.onChangeAction);
  },

  /**
   * @method
   * @protected
   */
  componentDidMount: function () {
    ActionsHandler.instance = this;
  },

  /**
   * @method
   * @protected
   */
  componentWillUnmount: function () {
    ActionStore.unlisten(this.onChangeAction);

    ActionsHandler.cancelCurrentAction();
    completeActionAll();
    // ActionActions.completeActionAll();
  },

  /**
   * Handle store change
   * @method
   * @protected
   * @param state
   */
  onChangeAction: function (state) {
    this.setState({
      action: state.toJS()
    });
  },

  /**
   * @method render
   * @protected
   */
  render: function () {
    return React.DOM.div(
      {},
      this.state.action.component && React.cloneElement(this.state.action.component, {
        ref: "component"
      })
    );
  },

  statics: {
    /**
     * @property _cancelDefer
     * @type {Q.Promise|null}
     * @private
     */
    _cancelDefer: null,

    /**
     * @property _currentHandler
     * @type {Handler}
     * @private
     */
    _currentHandler: null,

    /**
     * Cancel any pending action
     * @method cancelCurrentAction
     */
    cancelCurrentAction: function () {
      if (this._currentHandler) {
        this._currentHandler.cancel();
      }
    },

    /**
     * Execuste the handler
     * @method execAction
     * @param {Action} action
     * @param {HandlerContainer} container
     * @param {Object} [contextActions]     Hash of context actions
     * @returns {Q.Promise}
     */
    execAction: function (action, container, contextActions, store) {
      var DEBUG = true;
      if (!this.ActionHandlers) {
        throw new Error("No handlers have been configured. Make sure ActionHandler.setActionHandlers has been called.");
      }

      if (this._cancelDefer) {
        return this._cancelDefer;
      }

      this._cancelDefer = this._currentHandler ? this._currentHandler.cancel() : null;

      return Q.allSettled([
        this._cancelDefer
      ]).finally(function () {
        this._cancelDefer = null;

        this._currentHandler = this.ActionHandlers[action.code];

        if (!this._currentHandler) {
          throw new Error("No handler found for '" + action.code + "'");
        }

        if (DEBUG) {
          if (console.group) {
            console.group("ACTION", action.code);
          }
          console.debug("ACTION: EXECUTING", action.code, action);
        }
        return this._currentHandler.exec(ActionsHandler.instance, action, container, contextActions,
          function (handler) {
            // ActionActions.execAction({
            //   action: handler.action,
            //   component: handler.component
            // });
            store.dispatch(
            execAction({
              action: handler.action,
              component: handler.component
            }));

          })
          .then(function (handler) {
            if (DEBUG) {
              console.debug("%cACTION: SUCCESS", "color:green", action.code, handler);
            }

            return Q.resolve(handler);
          })
          .fail(function (handler) {
            if (DEBUG) {
              console.debug("%cACTION: FAILED", "color:red", action.code, handler);
            }

            if (handler && handler.error) {
              console.error(handler.error);
            }

            return Q.reject(handler);
          })
          .finally(function () {
            if (DEBUG) {
              console.debug("%cACTION: COMPLETED", "color:orange", action.code);
              if (console.groupEnd) {
                console.groupEnd();
              }
            }

            this._currentHandler = null;

            // ActionActions.completeAction({
            //   action: action
            // });
            completeAction({
              action: action
            });

          }.bind(this));
      }.bind(this));
    },

    /**
     * Normalize the actions to remove any actions without a handler and promote otherActions if there are no primaryActions
     * @method getNormalizedActions
     * @param {Actions} actions
     * @param {Object} [filter]
     * @param {Object} [filter.exclude]
     * @param {Object} [filter.include]
     * @returns {Actions}
     */
    getNormalizedActions: function (actions, filter) {
      if (!actions) {
        return new Actions();
      }

      if (!this.ActionHandlers) {
        console.error("No handlers have been configured. Make sure ActionHandler.setActionHandlers has been called.");
        return new Actions();
      }

      var normalizedActions = new Actions({
        primaryActions: getActionsWithValidHandler(this.ActionHandlers, actions.primaryActions, filter),
        otherActions: getActionsWithValidHandler(this.ActionHandlers, actions.otherActions, filter)
      });

      // If no valid primary action has been found then promote the first otherActions:
      if (normalizedActions.primaryActions.length === 0) {
        normalizedActions.primaryActions = normalizedActions.otherActions.splice(0, 1);
      }

      return normalizedActions;
    },

    /**
     * Get action label from handler
     * @param {Action} action
     * @returns {Object}
     */
    getLabelDetails: function (action) {
      if (!this.ActionHandlers) {
        console.error("No handlers have been configured. Make sure ActionHandler.setActionHandlers has been called.");
        return null;
      }

      if (!this.ActionHandlers[action.code]) {
        throw new Error("No handler found for '" + action.code + "'");
      }

      return this.ActionHandlers[action.code].getLabelDetails(action);
    },

    /**
     * @method setActionHandlers
     * @param {Object} ActionHandlers
     */
    setActionHandlers: function (ActionHandlers) {
      this.ActionHandlers = ActionHandlers;
    }
  }
});

export default ActionsHandler;

/* eslint-enable */