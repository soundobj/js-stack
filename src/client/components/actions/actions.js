/*
 *
 * All rights reserved. Copyright (c) Ixxus Ltd 2015
 *
 * @author Matt Dunn
 *
 */
import _ from "lodash";
import Action from "./action";

/**
 * Actions
 * @class Actions
 * @param {Object|Actions} [actions]
 * @param {Array.<String>} [filters]
 * @constructor
 */
export default function Actions(actions, filters) {
  const primaryActions = (actions || []).primaryAction ? [(actions || []).primaryAction] : (actions || []).primaryActions;

  /**
   * Primary Actions
   * @property primaryActions
   * @type {Array.<Action>|undefined}
   */
  this.primaryActions = parseActions(primaryActions, filters);

  /**
   * Other Actions
   * @property otherActions
   * @type {Array.<Action>|undefined}
   */
  this.otherActions = parseActions((actions || []).otherActions, filters);
}

/**
 * Has any valid action(s)
 * @method hasActions
 * @returns {boolean}
 */
Actions.prototype.hasActions = function () {
  return (this.primaryActions && this.primaryActions.length > 0) || (this.otherActions && this.otherActions.length > 0);
};

/**
 * Get an action
 * @method getAction
 * @param {String} actionCode
 * @returns {Action|undefined}
 */
Actions.prototype.getAction = function (actionCode) {
  let action = getAction(this.primaryActions, actionCode);

  if (!action) {
    action = getAction(this.otherActions, actionCode);
  }
  return action;
};

/**
 * Has an action
 * @method hasAction
 * @param {String|Array.<String>} actionCode
 * @returns {Boolean}
 */
Actions.prototype.hasAction = function (actionCode) {
  const actionCodes = _.isArray(actionCode) ? actionCode : [actionCode];

  for (let i = 0; i < actionCodes.length; i++) {
    if (this.getAction(actionCodes[i]) !== undefined) {
      return true;
    }
  }

  return false;
};

/**
 * Get all actions
 * @method getAll
 * @returns {Array.<Action>}
 */
Actions.prototype.getAll = function () {
  return this.primaryActions.concat(this.otherActions);
};

/**
 * Parse Object and return Action
 * @method parseActions
 * @param {Array.<Object>|Array.<Action>} actions
 * @param {Array.<String>} [filters]
 * @returns {Array.<Action>|undefined}
 */
function parseActions(actions, filters) {
  if (actions) {
    if (filters) {
      /* eslint-disable */
      return filters.map((filter) => {
        var action = getAction(actions, filter);
        if (action) {
          return new Action(action);
        }
      }).filter((item) => {
        return item;
      });
      /* eslint-enable */
    }

    return actions.map((action) => {
      return new Action(action);
    });
  }

  return [];
}

/**
 * Get an action
 * @method getAction
 * @param {Array.<Object>|Array.<Action>} actions
 * @param {String} actionCode
 * @returns {Action|undefined}
 */
function getAction(actions, actionCode) {
  return _.find(actions, (action) => {
    return action.code === actionCode;
  });
}