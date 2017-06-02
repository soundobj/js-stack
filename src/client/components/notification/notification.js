import React, { PropTypes } from "react";
import "./notification.scss";
import template from "./notification.jsx";

export default class Notification extends React.Component {

  constructor(props) {
    super(props);

    this.handleCloseNotification = this.handleCloseNotification.bind(this);
  }

  handleCloseNotification() {
    this.props.clearNotifications();
  }

  render() {
    this.render = template;
    return this.render.call(this);
  }
}

Notification.propTypes = {
  notification: PropTypes.object,
  clearNotifications: PropTypes.func,
};