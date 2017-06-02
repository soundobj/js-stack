/*
 *
 * All rights reserved. Copyright (c) Ixxus Ltd 2015
 *
 * @author Matt Dunn
 *
 */
import _ from "lodash";

/**
 * Action
 * @class Action
 * @param {Object|Action} [action]
 * @constructor
 */
export default function Action(action) {
  /**
   * @property code
   * @default null
   * @type {String}
   */
  this.code = (action || {}).code || null;

  /**
   * @property rel
   * @default null
   * @type {String}
   */
  this.rel = (action || {}).rel || null;

  /**
   * @property targetObject
   * @default null
   * @type {Object}
   */
  this.targetObject = (action || {}).targetObject || null;

  /**
   * @property expectedArgs
   * @default null
   * @type {Array.<String>}
   */
  this.expectedArgs = (action || {}).expectedArgs || [];

  /**
   * @property asynchronous
   * @default null
   * @type {Boolean}
   */
  this.asynchronous = (action || {}).asynchronous || null;

  /**
   * @property publish
   * @default null
   * @type {Boolean}
   */
  this.publish = (action || {}).publish || null;

  /**
   * @property group
   * @default null
   * @type {null|String}
   */
  this.group = (action || {}).group || null;

  /**
   * @property method
   * @default null
   * @type {null|String}
   */
  this.method = (action || {}).method || null;
}

Action.prototype.getParameters = function (data) {
  if (!this.expectedArgs) {
    return data;
  }

  const parameters = [];

  this.expectedArgs.map((arg) => {
    let value = null;
    // gracefully handle false booleans
    if (data && data[arg] === false) {
      value = false;
    } else if (data && data[arg]) {
      value = data[arg];
    }

    if (_.isObject(value)) {
      value = JSON.stringify(value);
    }
    parameters.push(value);
  });

  return parameters;
};

/**
 * Convert an array into expected action arguments object
 * @param {Array} data
 * @returns {Object}
 */
Action.prototype.getArgs = function (data) {
  const actionArgs = {};

  this.expectedArgs.map((arg, index) => {
    actionArgs[arg] = data && data[index];
  });

  return actionArgs;
};

/**
 * Resolve action rel from data _links property
 * @method getRel
 * @param {Object} data
 * @returns {null|Object}   Rel object or null
 */
Action.prototype.getRel = function (data) {
  return (data._links || {})[this.rel] || null;
};