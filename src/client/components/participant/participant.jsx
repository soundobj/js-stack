import React from "react";
import { Button } from "react-bootstrap";

const template = function () {
  const participant = this.props.participant;

  function getInitials(participant) {
    let initials = "";
    if (participant.name) {
      initials = participant.name.charAt(0);
    }
    if (participant.surname) {
      initials += participant.surname.charAt(0);
    }
    return initials;
  }

  const participantName = (
    <div className="participant__participant__fullname">
      <span className="participant__participant__suffix">{participant.suffix}</span>
      <span className="participant__participant__name">{participant.name}</span>
      <span className="participant__participant__surname">{participant.surname}</span>
    </div>
  );

  if (this.props.onlyName) {
    return participantName;
  }

  // TODO: https://css-tricks.com/multi-line-padded-text/ for email and wbr
  return (
    <article className="participant">
      <header className="participant__header">
        <ul>
          <li>
            <div className="avatar"><span className="avatar__text">{getInitials(participant)}</span></div>
          </li>
          <li>
            <address>
              <div className="participant__participant">
                {participantName}
                <a href={`mailto:${participant.email}`}>
                  <span className="glyphicon glyphicon-envelope participant__participant__email-icon" >
                    { // eslint-disable-next-line react/no-danger
                    } <b className="participant__participant__email" dangerouslySetInnerHTML={{ __html: participant.email.replace(/\.|@/g, match => `${match}<wbr>`) }} />
                  </span>
                </a>
              </div>
              {participant.address &&
                <div className="participant__address">
                  <span className="glyphicon glyphicon-home participant__address__icon" />
                  <span className="participant__address__streetName">{participant.address.streetName}</span>
                  <span className="participant__address__streetAddress">{participant.address.streetAddress}</span>
                  <span className="participant__address__country">{participant.address.country}</span>
                  <span className={`participant__address__countryCode flag-icon flag-icon-${participant.address.countryCode.toLowerCase()}`} />
                </div>
              }
            </address>
          </li>
        </ul>
      </header>
      {this.props.action &&
        <footer className="participant__footer">
          <Button className="btn btn-primary" onClick={this.handleParticipantSelection}>{this.props.action}</Button>
        </footer>
      }
    </article>
  );
};

export default template;