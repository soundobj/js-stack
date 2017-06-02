/*
 *
 * All rights reserved. Copyright (c) Ixxus Ltd 2015
 *
 * @author Matt Dunn
 *
 */

import _ from "lodash";
import Q from "q";

/**
 * @class HandlerInstance
 * @param handle {Function}
 * @constructor
 */
const HandlerInstance = function (handle) {
  /**
   * Handler function
   * @property handle
   * @type {Function}
   */
  this.handle = handle;

  /**
   * Completion promise
   * @property completeDefer
   * @type {Q.defer}
   */
  this.completeDefer = Q.defer();

  /**
   * Next handler
   * @property next
   * @type {null|Handler}
   */
  this.next = null;

  /**
   * Cancel callback for handler
   * @property cancel
   * @type {Function}
   */
  this.cancel = _.noop;

  /**
   * Cancellation promise
   * @property cancelDefer
   * @type {Q.defer}
   */
  this.cancelDefer = null;

  /**
   * Data container for this handler
   * @property container
   * @type {null|HandlerContainer}
   */
  this.container = null;

  /**
   * Goal action
   * @property action
   * @type {Action}
   */
  this.action = null;

  /**
   * Handler context action hash
   * @property contextActions
   * @type {Object}
   */
  this.contextActions = null;

  /**
   * Progress callback
   * @property onProgress
   * @@type {Function}
   */
  this.onProgress = null;

  /**
   * Handler context
   * @property context
   * @type {React.Element}
   */
  this.context = null;

  /**
   * @type {boolean}
   * @private
   */
  this._handleHasBeenCalled = false;
};

/**
 * Called when the action cancellation is complete
 * @method onCancelled
 * @param {Object|String|undefined} error
 * @returns {Object}
 */
HandlerInstance.prototype.onCancelled = function onCancelled(error) {
  if (error && Object.prototype.hasOwnProperty.call(error, "error")) {
    return error;
  }

  return {
    action: this.action,
    contextActions: this.contextActions,
    error,
  };
};

/**
 * @method onCancel
 * @param {Function} cancelHandler
 */
HandlerInstance.prototype.onCancel = function onCancel(cancelHandler) {
  this.cancel = function () {
    if (!this.cancelDefer) {
      this.cancelDefer = Q.defer();
    }

    if (this._handleHasBeenCalled) {
      cancelHandler(this.cancelDefer);
    } else {
      this.cancelDefer.reject();
    }

    return this.cancelDefer.promise;
  };
};

/**
 * @method callHandle
 * @param {HandlerContainer} container
 * @param {Boolean} [isNotified]
 */
HandlerInstance.prototype.callHandle = function callHandle(container, isNotified) {
  if (this.completeDefer.promise.inspect().state === "pending") {
    this._handleHasBeenCalled = true;

    const ret = this.handle.call(
      null,
      this.context,
      this.action,
      container,
      (function onComplete() {
        const defer = this.completeDefer;

        return {
          resolve: defer.resolve,
          reject: defer.reject,
        };
      }.bind(this)()),
      this.contextActions,
      this.onCancel.bind(this),
      (container) => { // eslint-disable-line no-shadow
        if (this.next) {
          this.next.completeDefer.notify(container);
        }
      },
      isNotified || false
    );

    if (this.onProgress) {
      this.onProgress({
        component: (ret || {}).component,
        action: this.action,
        container,
      });
    }
  }
};

export default HandlerInstance;