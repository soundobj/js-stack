import React, { PropTypes } from "react";
import $ from "jquery";
import template from "./status.jsx";
import "./status.scss";

export default class status extends React.Component {

  constructor(props) {
    super(props);
    this._displayTimeout = null;
    this.state = {
      shown: false,
    };
  }

  componentDidMount() {
    this.context.store.subscribe(() => {
      if (this.context.store.getState().toJS().status.show) {
        this.show();
      }
    });
  }

  componentWillUnmount() {
    $(this.node).off(".status");
  }

  /**
   * Show status
   * @method show
   */
  show() {
    this.setState({ shown: true });
    clearInterval(this._displayTimeout);
    this._displayTimeout = setTimeout(() => {
      this.hide();
    }, this.props.displayDuration);
  }

  /**
   * Hide status
   * @method hide
   */
  hide() {
    if (this.state.shown) {
      clearInterval(this._displayTimeout);
      this.props.removeStatus();
      this.setState({ shown: false });
    }
  }

  render() {
    this.render = template;
    return this.render.call(this);
  }
}

status.propTypes = {
  status: PropTypes.object.isRequired,
  displayDuration: PropTypes.number,
  removeStatus: PropTypes.func.isRequired,
};

status.defaultProps = {
  displayDuration: 1500,
};

status.contextTypes = {
  store: React.PropTypes.object,
};