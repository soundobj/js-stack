import React from "react";
import { FormattedMessage } from "react-intl";
import { Navbar, Nav, NavItem /* , NavDropdown, MenuItem */ } from "react-bootstrap";

const template = function () {
  const actions = this.props.user.toJS().links || [];

  return (
    <Navbar inverse collapseOnSelect fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          { // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          }<a onClick={actions.find(x => x.action === "ADD_NOTE") ? this.handleNotesRedirect : null}>
            {this.props.appLogo && <img alt="logo" src={this.props.appLogo} className="navbar__logo" />}
            <span className="navbar__title">
              <FormattedMessage
                id={"navbar.appName"}
                defaultMessage={"AppName"}
              />
            </span>
          </a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} onClick={this.handleVersionRedirect}>version</NavItem>
        </Nav>
        <Nav pullRight>
          {actions.find(x => x.action === "ADD_NOTE") &&
            <NavItem eventKey={4} onClick={this.handleAddNote}>
              <FormattedMessage
                id={"navbar.addNote"}
                defaultMessage={"navbar.addNote"}
              />
            </NavItem>
          }
          {actions.find(x => x.action === "FETCH_BOARD") &&
            <NavItem eventKey={4} onClick={this.handleBoardRedirect}>
              <FormattedMessage
                id={"navbar.board"}
                defaultMessage={"navbar.board"}
              />
            </NavItem>
          }
          <NavItem eventKey={2} onClick={this.handleLogout}>logout</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

/**
 <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
 <MenuItem eventKey={3.1}>Action</MenuItem>
 <MenuItem eventKey={3.2}>Another action</MenuItem>
 <MenuItem eventKey={3.3}>Something else here</MenuItem>
 <MenuItem divider />
 <MenuItem eventKey={3.3}>Separated link</MenuItem>
 </NavDropdown>
 */
export default template;