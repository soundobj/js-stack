import React, { PropTypes } from "react";
import _ from "lodash";
import shallowCompare from "react-addons-shallow-compare";
import template from "./actionContainer.jsx";

export default class actionContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      component: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const _nextProps = nextProps.action.toJS();
    if (React.isValidElement(_nextProps.current)) {
      // render a React component
      this.setState({ component: _nextProps.current });
    } else if (_.isFunction(_nextProps.current)) {
      // execute callback and remove any React component
      _nextProps.current();
      this.setState({ component: null });
    } else {
      // remove any React component
      this.setState({ component: null });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    this.render = template;
    return this.render.call(this);
  }
}

actionContainer.propTypes = {
  action: PropTypes.object.isRequired,
  next: PropTypes.func.isRequired,
  previous: PropTypes.func.isRequired,
  cancelAction: PropTypes.func.isRequired,
};