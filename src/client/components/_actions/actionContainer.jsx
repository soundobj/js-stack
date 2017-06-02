import React from "react";

const template = function () {
  return React.DOM.div(
    {},
    this.state.component && React.cloneElement(this.state.component, {
      ref: "component",
    })
  );
};

export default template;