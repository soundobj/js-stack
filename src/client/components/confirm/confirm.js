import React, { PropTypes } from "react";
import template from "./confirm.jsx";

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(actionCode) {
    if (actionCode === "confirm") {
      this.props.onComplete();
    } else {
      this.props.onCancel();
    }
  }

  render() {
    this.render = template;
    return this.render.call(this);
  }
}

Confirm.propTypes = {
  onComplete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Confirm;