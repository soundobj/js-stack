/*
 *
 * All rights reserved. Copyright (c) Ixxus Ltd 2015
 *
 * @author Matt Dunn
 *
 */

/**
 * @module Dialog
 */

import React from "react";
import { Modal, Button } from "react-bootstrap";
import Footer from "./footer.jsx";

const template = function () {
  let actions = null;
  const childrenBody = [];
  const childrenFooter = [];

  React.Children.forEach(this.props.children, (child) => {
    if (child.type === Footer) {
      childrenFooter.push(child);
    } else {
      childrenBody.push(child);
    }
  });

  if (this.props.actions) {
    actions = this.props.actions.map((action, index) => {
      return (
        <Button
          key={index}
          onClick={this.handleAction.bind(this, action)}
          bsStyle={action.severity}
          disabled={(this.state.disabled && this.state.disabled.id === action.id) ? this.state.disabled.disabled : action.disabled || false}
        >
          {action.label}
        </Button>
      );
    });
  }

  return (
    <Modal
      dialogClassName={this.props.dialogClassName}
      bsSize={this.props.bsSize}
      show={this.state.showModal}
      onHide={this.handleClose}
      backdrop={"static"}
      ref={"modal"}
    >
      <Modal.Header closeButton={true}>
        <div>
          <Modal.Title>{this.props.title}</Modal.Title>
          {this.props.headerContent}
        </div>
      </Modal.Header>

      <Modal.Body>
        {childrenBody}
      </Modal.Body>

      {(this.props.actions && this.props.actions.length > 0 || childrenFooter.length > 0) &&
      <Modal.Footer>
        {actions}
        {childrenFooter}
      </Modal.Footer>
      }
    </Modal>
  );
};

export default template;