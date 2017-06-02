import React, { Component } from "react";
import "./loadingHOC.scss";
import { isEmpty, getValueByPath } from "../../api/val-utils";

const LoadingHOC = (loadingProp) => (WrappedComponent) => { // eslint-disable-line arrow-parens
  return class LoadingHOC extends Component {
    componentDidMount() {
      console.error("@ HOC loading did mount", loadingProp);
      this.startTimer = Date.now();
    }

    isPropEmpty(props, loadingProp) {
      const _isEmpty = isEmpty(getValueByPath(props, loadingProp));
      if (!isEmpty) {
        this.endTimer = Date.now();
      }
      return _isEmpty;
    }

    componentWillUpdate(nextProps) {
      if (!this.isPropEmpty(nextProps, loadingProp)) {
        this.endTimer = Date.now();
      }
    }

    render() {
      const myProps = {
        loadingTime: ((this.endTimer - this.startTimer) / 1000).toFixed(2),
      };

      console.error("@ loading??", this.isPropEmpty(this.props, loadingProp));
      return this.isPropEmpty(this.props, loadingProp) ? <div className="loader" /> :
      <WrappedComponent {...this.props} {...myProps} />;
    }
  };
};

export default LoadingHOC;