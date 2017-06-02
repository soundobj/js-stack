/*!
 *
 * All rights reserved. Copyright (c) Ixxus Ltd 2015
 *
 * @author Matt Dunn
 *
 */

/**
 * @module Dialog
 */

import Q from "q";
import $ from "jquery";
// import _ from "lodash";
import React from "react";
// import ReactIntl from "react-intl";
import Footer from "./footer";
// import locale from "./locale/en-US/main.json";
// import appLocale from "../locale/en-US/main";
import template from "./dialog.jsx";

// Extend app locale with component locale
// $.extend(true, appLocale, locale);

/**
 * Dialog component
 *
 * @class Dialog
 * @constructor
 * @return {Function}
 */
export default class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAction = this.handleAction.bind(this);

    this.state = {
      showModal: this.props.open,
    };
  }

  /**
   * @method
   * @protected
   */
  componentWillReceiveProps(nextProps) {
    const action = nextProps.action && nextProps.action.toJS();
    if (action) {
      this.setState({
        disabled: {
          id: action.action.id,
          disabled: action.disabled,
        },
      });
    }
    this.setState({
      showModal: (nextProps.open === true),
    });
  }

  /**
   * Close dialog
   * @method close
   */
  close(action) {
    const defer = Q.defer();
    const _this = this;

    // Wait until the dialog has transitioned before calling any actions - this will ensure the transition will complete before the dialog is removed from the DOM.
    // $(".modal-backdrop").one("webkitTransitionEnd.dialog otransitionend.dialog oTransitionEnd.dialog msTransitionEnd.dialog transitionend.dialog", function() {

    // Use timeout to allow for dialog transition to complete before continuing :( Unfortunately listening for
    // transition end event does not *always* work as the element can sometimes be already removed from the DOM
    // by react-bootstrap dialog.
    setTimeout(function () {
      if (!$(this).hasClass("in")) {
        if (_this.props.onClose) {
          _this.props.onClose(action);
        }

        defer.resolve();
      }
    }, 300);

    this.setState({
      showModal: false,
    });

    return defer.promise;
  }

  /**
   * Open dialog
   * @method open
   */
  open() {
    this.setState({
      showModal: true,
    });
  }

  /**
   * Handle close action
   * @method handleClose
   */
  handleClose() {
    this.close();
  }

  /**
   * Handle action
   * @method handleAction
   */
  handleAction(action) {
    // Wait until the dialog has transitioned before calling any actions - this will ensure the transition will complete before the dialog is removed from the DOM.
    // $(".modal-backdrop").one("webkitTransitionEnd.dialog otransitionend.dialog oTransitionEnd.dialog msTransitionEnd.dialog transitionend.dialog", function() {

    // Use timeout to allow for dialog transition to complete before continuing :( Unfortunately listening for
    // transition end event does not *always* work as the element can sometimes be already removed from the DOM
    // by react-bootstrap dialog.
    setTimeout(function () {
      if (!$(this).hasClass("in")) {
        if (action && action.action) {
          action.action.call(null);
        }
      }
    }, 300);

    return this.close(action.code);
  }

  /**
   * @method
   * @protected
   */
  render() {
    this.render = template;
    return this.render.call(this);
  }
}

Dialog.defaultProps = {
  open: false,
};

Dialog.propTypes = {
  open: React.PropTypes.bool,
  title: React.PropTypes.string.isRequired,
  headerContent: React.PropTypes.string,
  footer: React.PropTypes.func,
  actions: React.PropTypes.array,
  action: React.PropTypes.object, // current Action in the store
  onClose: React.PropTypes.func,
  dialogClassName: React.PropTypes.string,
  bsSize: React.PropTypes.oneOf(["sm", "md", "lg"]),
};

Dialog.Footer = Footer;