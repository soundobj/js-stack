import React, { PropTypes } from "react";
import "./navbar.scss";
import template from "./navbar.jsx";
import { initAction } from "../_actions/action-actions";

export default class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleVersionRedirect = this.handleVersionRedirect.bind(this);
    this.handleNotesRedirect = this.handleNotesRedirect.bind(this);
    this.handleBoardRedirect = this.handleBoardRedirect.bind(this);
    this.handleAddNote = this.handleAddNote.bind(this);
  }

  handleLogout() {
    this.props.logout();
    this.context.router.replace(`/login?from=${this.context.router.location.pathname}${this.context.router.location.search}`);
  }

  handleVersionRedirect() {
    this.context.router.replace("/version");
  }

  handleNotesRedirect() {
    this.context.router.replace("/notes");
  }

  handleAddNote() {
    this.context.store.dispatch(initAction({ id: "addNote" }));
  }

  handleBoardRedirect() {
    this.context.router.replace("/lists");
  }

  render() {
    this.render = template;
    return this.render.call(this);
  }
}

Navbar.propTypes = {
  appLogo: PropTypes.string,
  user: PropTypes.object.isRequired,
  appName: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

Navbar.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,
};