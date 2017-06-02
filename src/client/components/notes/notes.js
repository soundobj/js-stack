import React, { PropTypes } from "react";
import template from "./notes.jsx";
import "./notes.scss";

class Notes extends React.Component {

  constructor(props) {
    super(props);
    this.handleUserScrollToBottom = this.handleUserScrollToBottom.bind(this);
    this.handleUserScrollToTop = this.handleUserScrollToTop.bind(this);
    this.handleUserScrollAwayFromTop = this.handleUserScrollAwayFromTop.bind(this);

    this.state = {
      hasMore: false,
      loadingMore: false,
      scrolled: false,
    };
  }

  componentDidMount() {
    this.props.fetchNotes();
    this.setState({ loading: true });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notes.toJS().fetched) {
      this.setState({ loadingMore: false });
    }
  }

  handleUserScrollToTop() {
    this.setState({ scrolled: false });
  }

  handleUserScrollAwayFromTop() {
    this.setState({ scrolled: true });
  }

  handleUserScrollToBottom() {
    this.props.fetchNotes(this.props.notes.toJS().links.next);
    this.setState({ loadingMore: true });
  }

  render() {
    this.render = template;
    return this.render.call(this);
  }
}

Notes.propTypes = {
  fetchNotes: PropTypes.func.isRequired,
  notes: PropTypes.object,
};

Notes.contextTypes = {
  store: React.PropTypes.object,
};

export default Notes;