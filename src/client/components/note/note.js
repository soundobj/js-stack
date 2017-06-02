import React, { PropTypes } from "react";
import enhanceWithClickOutside from "react-click-outside";
import { placeCaretAtEnd } from "../../api/input-utils";
import template from "./note.jsx";
import { execAction } from "../../api/action-utils";
import { initAction } from "../_actions/action-actions";
import "./note.scss";

class Note extends React.Component {

  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.hasContentChanged = this.hasContentChanged.bind(this);
    this.save = this.save.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleCompare = this.handleCompare.bind(this);
    this.handleNoteOnClick = this.handleNoteOnClick.bind(this);
    this.handleShowVersions = this.handleShowVersions.bind(this);
    this.handleVersionCompare = this.handleVersionCompare.bind(this);
    this.manageDiffToolVersions = this.manageDiffToolVersions.bind(this);
    this.handleParticipantPopUpPositioning = this.handleParticipantPopUpPositioning.bind(this);

    this.autoSaveDelay = undefined;
    this.state = {
      editing: false,
      processing: false,
      note: {},
      noteLastSaved: this.props.note.note,
      overlayPosition: "top",
      versionsVisible: false,
      compare: false,
      comparingVersions: [],
    };
  }

  componentDidMount() {
    this.setState({ note: this.props.note });
  }

  componentDidUpdate() {
    if (this.state.editing) {
      this.noteText.focus();
    } else {
      this.noteText.blur();
    }
  }

  save() {
    this.setState({ processing: true });
    execAction(
      this.props.note.links.find(x => x.id === "editNote"),
      Object.assign(this.props.note, { text: this.noteText.textContent }),
      { id: this.props.note.id }
    ).then((/* response */) => {
      this.setState({ processing: false, noteLastSaved: this.noteText.textContent });
    }).catch(() => {
      this.setState({ processing: false, noteLastSaved: this.props.note.text });
    });
  }

  hasContentChanged(prop, content) {
    return this.state[prop] !== content;
  }

  handleEditChange(event) {
    this.setState({ note: Object.assign(this.state.note, { text: event.target.textContent }) });
    clearTimeout(this.autoSaveDelay);
    this.autoSaveDelay = setTimeout(this.save, this.props.autoSaveDelay);
  }

  handleShowVersions() {
    this.setState({ versionsVisible: !this.state.versionsVisible, compare: false, comparingVersions: [] });
  }

  handleCompare() {
    this.setState({ compare: !this.state.compare });
    if (this.props.onCompare) {
      this.props.onCompare(this.props.note);
      return;
    }
    // mark version as parent
    this.manageDiffToolVersions(Object.assign({ isParent: true }, this.props.note));
  }

  handleVersionCompare(version) {
    this.manageDiffToolVersions(version);
  }

  manageDiffToolVersions(version) {
    const comparingVersions = this.state.comparingVersions;
    if (comparingVersions.length === 1) {
      comparingVersions.push(version);
      this.setState({ comparingVersions });

      const cancelDiff = () => {
        // Reset compare toggle icons
        this.state.comparingVersions.map((version) => {
          if (version.id === this.props.note.id) {
            this.setState({ compare: false });
          } else {
            this.refs[version.id].setState({ compare: false });
          }
        });
        this.setState({ comparingVersions: [] });
      };

      this.context.store.dispatch(initAction({
        id: "compareVersion",
        context: Object.assign({}, {
          cancel: cancelDiff,
          versions: this.state.comparingVersions,
          action: this.props.note.links.find(x => x.id === "compareVersion"),
          onComplete: cancelDiff,
        }),
      }));
    } else {
      comparingVersions.push(version);
      this.setState({ comparingVersions });
    }
  }

  /**
   * @method handleParticipantPopUpPositioning
   * Ensure the participant pop up is visible if its trigger is too close to the top of the page
   */
  handleParticipantPopUpPositioning() {
    const authorName = this.authorName._reactInternalInstance._renderedComponent._hostNode;
    const authorNamePosition = authorName.getBoundingClientRect();
    if (authorNamePosition.top < 200) {
      this.setState({ overlayPosition: "bottom" });
    }
  }

  handleEdit() {
    placeCaretAtEnd(this.noteText);
    this.setState({ editing: true });
  }

  handleSave() {
    clearTimeout(this.autoSaveDelay);
    if (this.hasContentChanged("noteLastSaved", this.noteText.textContent)) {
      this.save();
    }
    this.setState({ editing: false });
  }

  handleNoteOnClick() {
    this.setState({ editing: true });
  }

  handleClickOutside() {
    this.setState({ editing: false });
  }

  render() {
    this.render = template;
    return this.render.call(this);
  }
}

Note.propTypes = {
  note: PropTypes.object.isRequired,
  autoSaveDelay: PropTypes.number,
  className: PropTypes.string,
  onCompare: PropTypes.func,
};

Note.contextTypes = {
  store: React.PropTypes.object,
};

Note.defaultProps = {
  autoSaveDelay: 2000,
};

export default enhanceWithClickOutside(Note);