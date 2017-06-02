import React from "react";

const template = function () {
  const action = this.props.action ? this.props.action.toJS() : [];
  return React.DOM.div(
    {},
    action.component && React.cloneElement(action.component, {
      ref: "component",
    })
  );
};

export default template;