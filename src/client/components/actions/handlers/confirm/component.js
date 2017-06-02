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

import $ from "jquery";
import _ from "lodash";
import React from "react";
// import ReactIntl from "react-intl";
import shallowCompare from "react-addons-shallow-compare";
import template from "./component.jsx";

/**
 * Confirm Component
 *
 * @class Confirm
 * @constructor
 * @return {Function}
 */
export default class Confirm extends React.Component {

  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleConfirmAction = this.handleConfirmAction.bind(this);
    this.render = this.render.bind(this);
  }

  getDefaultProps() {
    return {
      actionSeverity: "primary",
    };
  }

  getInitialState() {
    return {
      confirmActionDisabled: true,
      confirms: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.actionConfirmMessage !== this.props.actionConfirmMessage || nextProps.actionSeverity !== this.props.actionSeverity) {
      this.setState({
        confirmActionDisabled: true,
        confirms: {},
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  /**
   * @method handleClose
   * @param {String} actionCode
   */
  handleClose(actionCode) {
    if (actionCode === "confirm") {
      this.props.onComplete.resolve();
    } else {
      this.props.onComplete.reject();
    }
  }

  /**
   * @method handleConfirmAction
   */
  handleConfirmAction(e) {
    const partialState = $.extend(true, {}, this.state);
    const actionConfirmMessages = _.isArray(this.props.actionConfirmMessage) ? this.props.actionConfirmMessage : [this.props.actionConfirmMessage];

    partialState.confirms[e.target.name] = e.target.checked;

    partialState.confirmActionDisabled = _.filter(partialState.confirms, ((checked) => {
      return checked === true;
    })).length !== actionConfirmMessages.length;

    this.setState(partialState);
  }

  /**
   * @method render
   * @protected
   */
  render() {
    this.render = template.bind(this);
    return this.render();
  }
}

Confirm.propTypes = {
  /**
   * @property onComplete
   * @type {Q.Promise}
   */
  onComplete: React.PropTypes.object.isRequired,

  /**
   * @property actionSeverity
   * @type {String}
   */
  actionSeverity: React.PropTypes.string,

  /**
   * @property actionConfirmMessage
   * @type {Object|Array.<Object>}
   */
  actionConfirmMessage: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.shape({
      message: React.PropTypes.node,
      confirm: React.PropTypes.node,
    })),
    React.PropTypes.shape({
      message: React.PropTypes.node,
      confirm: React.PropTypes.node,
    }),
  ]),
};