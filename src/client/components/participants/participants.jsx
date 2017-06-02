import React from "react";
import Participant from "../participant/participant";

const template = function () {
  const participants = this.props.participants.toJS().participants;
  console.error("@ par", participants);

  return (
    <article className="participants">

      {participants.length ?
        participants.map(participant => (<Participant key={participant.id} action={this.props.action} onSelection={this.props.onSelection} participant={participant} />))
        : <div className="loader" />
      }
    </article>
  );
};

export default template;