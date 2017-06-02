import React, { PropTypes } from "react";
import { diffChars } from "diff";
import template from "./diffTool.jsx";
import "./diffTool.scss";

class DiffTool extends React.Component {

  constructor(props) {
    super(props);
    this.handleRevertChange = this.handleRevertChange.bind(this);
    this.handleDiffOverlayExit = this.handleDiffOverlayExit.bind(this);
    this.handleDiffSelection = this.handleDiffSelection.bind(this);
    this.setDiff = this.setDiff.bind(this);
    this.state = {
      // Refers to the current object, not a previous version of the object.
      // when a parent is present of a diff the user has actions such as rollback to previous version or revert specific changes
      parent: undefined,
      diff: undefined,
      text: undefined,
      version: undefined,
      selectedPart: undefined,
    };
  }

  componentDidMount() {
    this.setDiff(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setDiff(nextProps);
  }

  setDiff(nextProps) {
    const parent = nextProps.versions.find(x => x.isParent === true);
    if (parent) {
      const version = nextProps.versions.find(x => !x.isParent);
      this.setState({
        parent,
        // Add index prop for easy retrieval and further processing
        diff: diffChars(version.text, parent.text).map((x, index) => { x.index = index; return x; }),
        text: parent,
        version,
      });
    } else {
      this.setState({
        // Add index prop for easy retrieval and further processing
        diff: diffChars(nextProps.versions[0].text, nextProps.versions[1].text).map((x, index) => { x.index = index; return x; }),
        text: nextProps.versions[1],
        version: nextProps.versions[0],
      });
    }
  }

  /**
   * test 2fa
   * @method handleRevertChange
   */
  handleRevertChange() {
    console.error("@ I would like to revert this", this.state.selectedPart);
    this.setState({
      diff: this.state.diff.map((part) => {
        if (part.index === this.state.selectedPart.index) {
          part.revert = !part.revert;
        }
        return part;
      }),
    }, () => {
      if (this.props.disableAction) {
        // return false if items to be reverted found otherwise true
        this.props.disableAction(!this.state.diff.find(x => x.revert === true));
      }
      if (this.props.addActionPayload) {
        this.props.addActionPayload(
          {
            payload: this.state.diff,
            key: "parts",
          }
        );
      }
    });
  }

  handleDiffOverlayExit() {
    this.setState({ selectedPart: undefined });
  }

  handleDiffSelection(part) {
    // move to next tick so the state of selectPart is not wiped when the user clicks on another change while the Overlay
    // is still open
    setTimeout(() => {
      this.setState({ selectedPart: part });
    });
  }

  render() {
    this.render = template;
    return this.render.call(this);
  }
}

DiffTool.propTypes = {
  versions: PropTypes.array.isRequired,
  disableAction: PropTypes.func,
  addActionPayload: PropTypes.func,
};

export default DiffTool;