/*
 *
 * All rights reserved. Copyright (c) Ixxus Ltd 2015
 *
 * @author Matt Dunn
 *
 */
import Q from "q";

/**
 * Action Handler
 * @param {Object} actionConfig
 * @param {Object} handler
 * @returns {Object}
 * @constructor
 */
export default function (actionConfig, handler) {
  return {
    /**
     * Action handler
     * @property {Object} handler
     */
    handler,

    /**
     * Additional action properties hash
     * @property {Object} actionProps
     */
    actionProps: actionConfig.actionProps,

    /**
     * Current executing handler context
     * @property _handlerContext
     * @type {Handler}
     * @private
     */
    _handlerContext: null,

    /**
     * Get action label details
     * @param {Action} action
     * @returns {Object}
     * @returns {Object.label}          Label text
     * @returns {Object.optionType}     Action option type (severity)
     */
    getLabelDetails: function (action) { // eslint-disable-line object-shorthand
      return actionConfig.getLabelDetails(action);
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
    exec: function (context, action, container, contextActions, onProgress) { // eslint-disable-line object-shorthand
      this._handlerContext = this.handler();
      return this._handlerContext.exec(context, action, container, contextActions, onProgress);
    },

    /**
     * Cancel the handler
     * @method cancel
     * @returns {Q.Promise}
     */
    cancel: function () { // eslint-disable-line object-shorthand
      if (this._handlerContext) {
        return this._handlerContext.cancel();
      }

      return Q.resolve();
    },
  };
}