import React from "react";
import Form from "react-jsonschema-form";

const template = function () {
  return (
    <Form
      schema={this.props.schema}
      onChange={null}
      onSubmit={this.props.onSubmit}
      onError={null}
    />
  );
};

export default template;