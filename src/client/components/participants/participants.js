import React, { PropTypes } from "react";
import template from "./participants.jsx";
import "./participants.scss";

class Participants extends React.Component {
  componentDidMount() {
    this.props.fetchParticipants(this.props.onFail);
  }

  render() {
    this.render = template;
    return this.render.call(this);
  }
}

Participants.propTypes = {
  participants: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired,
  onSelection: PropTypes.func.isRequired,
  fetchParticipants: PropTypes.func.isRequired,
  onFail: PropTypes.func,
};

export default Participants;