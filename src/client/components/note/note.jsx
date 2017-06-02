import React from "react";
import { FormattedMessage } from "react-intl";
import { Button, Popover, OverlayTrigger } from "react-bootstrap";
import classnames from "classnames";
import Participant from "../participant/participant";
import { intl, formats } from "../../i18n";

const template = function () {
  const Note = this.constructor;
  const note = this.props.note;
  const actions = [];
  const editNote = note.links && note.links.find(x => x.id === "editNote");
  const compareVersion = note.links.find(x => x.id === "compareVersion");
  // const assignNote = note.links.find(x => x.id === "assignNote");

  const compareAction = (
    <Button
      className={classnames("note__action__compare", { inverse: this.state.compare })}
      onClick={this.handleCompare}
    >
      <span
        title={intl.formatMessage({ id: "note.compareVersions" })}
        className={classnames("note__action glyphicon glyphicon-random")}
      />
    </Button>
  );

  if (editNote) {
    actions.push((
      <Button
        className="note__action__edit"
        onClick={this.state.editing ? this.handleSave : this.handleEdit}
        disabled={this.state.processing}
      >
        <span
          title={intl.formatMessage({ id: "note.editNote" })}
          className={classnames("note__action glyphicon", {
            "glyphicon-edit": !this.state.editing,
            "glyphicon-save": this.state.editing,
          })}
        />
      </Button>
    ));

    if (note.versions.length) {
      actions.push((
        <Button
          className={classnames("note__action__versions", { inverse: this.state.versionsVisible })}
          onClick={this.handleShowVersions}
        >
          <span
            title={intl.formatMessage({ id: "note.showVersions" })}
            className={classnames("note__action glyphicon glyphicon-tags")}
          />
        </Button>
      ));
    }

    if (this.state.versionsVisible) {
      actions.push(compareAction);
    }
  }

  if (compareVersion && !editNote) {
    actions.push(compareAction);
  }

  const participantPopover = (
    <Popover className="participant__poopover" id="popover-trigger-click-root-close" >
      <Participant participant={note.author.participant} />
    </Popover>
  );

  return (
    <article className={`note ${this.props.className}`} ref="note">
      <ul className="note__metadata">
        <li>
          <dl className="metadata__item">
            <dd className="metadata__key">
              <span className="glyphicon glyphicon-time note__time" />
              <span className="note__created">
                <FormattedMessage
                  id={"note.createdDate"}
                  defaultMessage={"createDate"}
                />
              </span>
            </dd>
            <dt className="metadata__value">
              <time dateTime={note.createdDate}>
                {intl.formatDate(note.createdDate, formats.dateTime)}
              </time>
            </dt>
          </dl>
        </li>
        <li>
          <dl className="metadata__item">
            <dd className="metadata__key">
              <span className="note__by">
                <FormattedMessage
                  id={"note.by"}
                  defaultMessage={"note.by"}
                />
              </span>
            </dd>
            <dt className="metadata__value">
              <OverlayTrigger trigger="click" rootClose placement={this.state.overlayPosition} overlay={participantPopover}>
                <a onClick={this.handleParticipantPopUpPositioning}>
                  <Participant
                    ref={(node) => { this.authorName = node; }}
                    onlyName={true}
                    participant={note.author.participant}
                  />
                </a>
              </OverlayTrigger>
            </dt>
          </dl>
        </li>
        {actions.map((action, index) => <li key={index}>{action}</li>)}
      </ul>
      <section>
        { // eslint-disable-next-line
        }<div dangerouslySetInnerHTML={{ __html: note.text }}
          ref={(node) => { this.noteText = node; }}
          className="note__content"
          onInput={editNote && this.handleEditChange}
          onClick={editNote && this.handleNoteOnClick}
          contentEditable={this.state.editing}
        />
      </section>
      { this.state.versionsVisible &&
        <div>
          <section className="note__versions">
            <header><h4>Versions</h4></header>
          </section>
          <section className="note__versions__versions">
            { note.versions.map(version => <Note ref={version.id} onCompare={this.handleVersionCompare} key={version.id} note={version} />) }
          </section>
        </div>
      }
    </article>
  );
};

export default template;