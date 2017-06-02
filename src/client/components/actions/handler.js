/*
 *
 * All rights reserved. Copyright (c) Ixxus Ltd 2015
 *
 * @author Matt Dunn
 *
 */

import Q from "q";
import _ from "lodash";
import $ from "jquery";
import ActionHandler from "./actionHandler";
import HandlerContainer from "./handlerContainer";
import HandlerInstance from "./handlerInstance";

/**
 * Action handler
 * @class Handler
 * @constructor
 * @param {Function} handle
 */
const Handler = function (handle) {
  /**
   * Collection of handlers to execute
   * @type {Array.<Object>}
   * @private
   */
  const _handlers = [];

  /**
   * Collection of finally handlers to execute
   * @type {Array.<Object>}
   * @private
   */
  const _finallyHandlers = [];

  /**
   * Currently executing handler
   * @type {null|{Object}}
   * @private
   */
  let _currentHandler = null;

  /**
   * Execute defer
   * @type {null|Q.Promise}
   * @private
   */
  let _execDefer = null;

  /**
   * Add exec handler
   * @method addHandler
   * @private
   * @param {Function} handle
   * @param {Array.<Object>} handlers
   */
  const addHandler = function addHandler(handle, handlers) { // eslint-disable-line no-shadow
    const handler = new HandlerInstance(handle);

    handler.completeDefer.promise
      .progress((container) => {
        if (handler !== _currentHandler) {
          handler.callHandle(new HandlerContainer(container), true);
        }
      });

    if (handlers.length > 0) {
      handlers[handlers.length - 1].next = handler; // eslint-disable-line no-param-reassign
    }

    handlers.push(handler);
  };

  addHandler(handle, _handlers);

  return {
    /**
     * Add an additional handler
     * @method then
     * @param {Function} handle
     * @returns {Handler}
     */
    /* eslint-disable */
    then: function (handle) {
      /* eslint-enable */
      addHandler(handle, _handlers);
      return this;
    },

    /**
     * Add an additional handler
     * @method finally
     * @param {Function} handle
     * @returns {Handler}
     */
    /* eslint-disable */
    finally: function (handle) {
      /* eslint-enable */
      addHandler(handle, _finallyHandlers);

      return this;
    },

    /**
     * Execute the handler
     * @method exec
     * @param {React.Element} context
     * @param {Action} action
     * @param {HandlerContainer} container
     * @param {Object} [contextActions]     Hash of context actions
     * @param {Function} [onProgress]       Progress callback
     * @returns {Q.Promise}
     */
    exec: function exec(context, action, container, contextActions, onProgress) {
      _currentHandler = null;

      let currentAction = action;

      function execHandlers(handlers) {
        _.map(handlers, (handler) => {
          /* eslint-disable */
          handler.context = context;
          handler.contextActions = contextActions || {};
          handler.onProgress = onProgress;
          handler.action = currentAction;
          /* eslint-enable */
        });

        return handlers.reduce((promise, handler) => { // eslint-disable-line no-shadow
          return promise
            .then((container) => { // eslint-disable-line no-shadow
              _currentHandler = handler;

              /* eslint-disable */
              handler.container = new HandlerContainer(container);
              handler.action = currentAction;
              /* eslint-enable */
              handler.callHandle(handler.container);

              return handler.completeDefer.promise
                .then((payload) => {
                  currentAction = payload && payload.nextAction || currentAction || handler.action;

                  const completedContainer = new HandlerContainer($.extend({}, handler.container, payload));

                  completedContainer.payload = $.extend(true, {}, handler.container.payload, completedContainer.payload);

                  if (handler.cancelDefer) {
                    return handler.cancelDefer.promise.finally(() => {
                      return Q.resolve(completedContainer);
                    });
                  }

                  return Q.resolve(completedContainer);
                });
            })
            .fail((error) => {
              if (handler.cancelDefer) {
                return handler.cancelDefer.promise.finally(() => {
                  return Q.reject(handler.onCancelled(error));
                });
              }

              return Q.reject(handler.onCancelled(error));
            });
        }, new Q(new HandlerContainer(container)));
      }

      _execDefer = execHandlers(_handlers)
        .finally(() => {
          return execHandlers(_finallyHandlers);
        });

      return _execDefer;
    },

    /**
     * Cancel the execution of the action
     * @method cancel
     * @private
     * @returns {Q.Promise}
     */
    cancel: function cancel() {
      if (!_currentHandler) {
        return Q.reject();
      }

      const cancelFollowing = function (handler) {
        handler.cancel();

        if (handler.completeDefer.promise.inspect().state === "pending") {
          handler.completeDefer.reject(_currentHandler.onCancelled().error);
        }

        if (handler.next) {
          cancelFollowing(handler.next);
        }
      };

      cancelFollowing(_currentHandler);

      return _execDefer;
    },
  };
};

Handler.Container = HandlerContainer;
Handler.ActionHandler = ActionHandler;

export default Handler;