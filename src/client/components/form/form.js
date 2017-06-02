import React, { PropTypes } from "react";
import template from "./form.jsx";

class Form extends React.Component {
  render() {
    this.render = template;
    return this.render.call(this);
  }
}

Form.propTypes = {
  schema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;