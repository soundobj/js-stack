import React, { PropTypes } from "react";
import template from "./participant.jsx";
import "./participant.scss";

class Participant extends React.Component {

  constructor(props) {
    super(props);
    this.handleParticipantSelection = this.handleParticipantSelection.bind(this);
  }

  handleParticipantSelection() {
    return this.props.onSelection(this.props.participant);
  }

  render() {
    this.render = template;
    return this.render.call(this);
  }
}

Participant.propTypes = {
  participant: PropTypes.object.isRequired,
  onSelection: PropTypes.func,
  action: PropTypes.string,
  onlyName: PropTypes.bool,
};

export default Participant;