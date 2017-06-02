import React from "react";
import Immutable from "immutable";
import classnames from "classnames";
import Waypoint from "react-waypoint";
import Note from "../note/note-container";

const template = function () {
  const notes = (Immutable.Iterable.isIterable(this.props.notes)) ? this.props.notes.toJS() : { notes: [] };

  return (
    <article className="HolyGrail-content">
      <Waypoint
        onEnter={this.handleUserScrollToTop}
        onLeave={this.handleUserScrollAwayFromTop}
        fireOnRapidScroll={false}
        threshold={2.0}
      />
      <section className="notes">
        <div className={classnames("notes__title", { "notes__title--scrolled": this.state.scrolled })}>
          <h1>Notes</h1>
        </div>
        <div className="notes__notes">
          {notes.fetched ?
            notes.notes.map(note => <Note key={note.id} note={note} />)
            : <div className="loader" />
          }
          {notes.links && notes.links.next && <Waypoint onEnter={this.handleUserScrollToBottom} threshold={2.0} />}
          {this.state.loadingMore && <div className="loader" />}
        </div>
      </section>
    </article>
  );
};

export default template;