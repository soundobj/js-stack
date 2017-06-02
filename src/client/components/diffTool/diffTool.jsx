import React from "react";
import { FormattedMessage } from "react-intl";
import { Popover, Button, OverlayTrigger } from "react-bootstrap";
import classnames from "classnames";
import Participant from "../participant/participant";
import { intl, formats } from "../../i18n";

const template = function () {
  let participantPopover;
  console.error("@ cl", this.state);
  if (this.state.version) {
    const showCancelRevertControls = this.state.selectedPart ? this.state.diff[this.state.selectedPart.index].revert : false;
    participantPopover = (
      <Popover className="participant__poopover" id="popover-trigger-click-root-close" >
        <article>
          <header>
            <dl className="metadata__item">
              <dt className="metadata__key">
                <FormattedMessage
                  id={"diff.originallyCreatedBy"}
                  defaultMessage={"originallyCreatedBy"}
                />
              </dt>
              <dd className="metadata__value">
                <Participant onlyName={true} participant={this.state.version.author.participant} />
              </dd>
            </dl>
            <dl className="metadata__item">
              <dt className="metadata__key">
                <FormattedMessage
                  id={"diff.on"}
                  defaultMessage={"on"}
                />
              </dt>
              <dd className="metadata__value">
                <time dateTime={this.state.version.createdDate}>
                  {intl.formatDate(this.state.version.createdDate, formats.dateTime)}
                </time>
              </dd>
            </dl>
          </header>
          {this.state.parent &&
            <footer>
              <Button
                className={"diff__action"}
                onClick={this.handleRevertChange}
              >
                <span
                  title={intl.formatMessage({ id: (showCancelRevertControls) ? "diff.cancelRevert" : "diff.revertChange" })}
                  className={classnames("glyphicon", { "glyphicon-hand-left": !showCancelRevertControls, "glyphicon-remove": showCancelRevertControls })}
                />
              </Button>
            </footer>
          }
        </article>
      </Popover>
    );
  }

  return (
    <article className="diff">
      {this.state.diff && this.state.diff.length && this.state.diff.map((part, index) => {
        if (part.removed) {
          return (
            <OverlayTrigger key={index} trigger="click" rootClose placement="bottom" overlay={participantPopover} onEnter={() => this.handleDiffSelection(part)} onExit={this.handleDiffOverlayExit}>
              <del className={classnames("diff__removed", { "diff__removed--revert": part.revert })}>{part.value}</del>
            </OverlayTrigger>
          );
        } else if (part.added) {
          return (<ins key={index} className="diff__added">{part.value}</ins>);
        }
        return (<span key={index} className={"diff__part"}>{part.value}</span>);
      })}
    </article>
  );
};

export default template;