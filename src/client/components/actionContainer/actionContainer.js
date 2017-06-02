import React, { PropTypes } from "react";
import shallowCompare from "react-addons-shallow-compare";
import template from "./actionContainer.jsx";

export default class actionContainer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillUnmount() {
    this.props.completeActionAll();
  }

  render() {
    this.render = template;
    return this.render.call(this);
  }
}

actionContainer.propTypes = {
  action: PropTypes.object.isRequired,
  completeActionAll: PropTypes.func.isRequired,
};