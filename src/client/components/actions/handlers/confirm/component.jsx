/*
 *
 * All rights reserved. Copyright (c) Ixxus Ltd 2015
 *
 * @author Matt Dunn
 *
 */

/**
 * @module Actions
 */

import _ from "lodash";
import React from "react";
import { Checkbox } from "react-bootstrap";
import Dialog from "../../../dialog/dialog";

const template = function () {
  const actionConfirmMessages = this.props.actionConfirmMessage && (_.isArray(this.props.actionConfirmMessage) ? this.props.actionConfirmMessage : [this.props.actionConfirmMessage]);
  return (
    <Dialog
      open={true}
      onClose={this.handleClose}
      title={this.props.title}
      actions={[
        {
          // label: this.getIntlMessage("components.dialog.options.cancel")
          label: "cancel",
        },
        {
          code: "confirm",
          // label: this.getIntlMessage("components.dialog.options.confirm"),
          label: "confirm",
          severity: this.props.actionSeverity,
          disabled: actionConfirmMessages && actionConfirmMessages.length > 0 && this.state.confirmActionDisabled,
        },
      ]}
    >
      <div>
        {this.props.children}

        {actionConfirmMessages && actionConfirmMessages.length > 0 &&
        <ul
          className="dialog__options list-unstyled"
        >
          {actionConfirmMessages.map((actionConfirmMessage, index) => {
            return (
              <li
                key={index}
                className="dialog__options__option"
              >
                {actionConfirmMessage.message &&
                <p>
                  {actionConfirmMessage.message}
                </p>
                }
                {actionConfirmMessage.confirm &&
                <Checkbox
                  name={`confirm-${index}`}
                  checked={this.state.confirms[`confirm-${index}`] || false}
                  onChange={this.handleConfirmAction}
                >
                  <strong>
                    {actionConfirmMessage.confirm}
                  </strong>
                </Checkbox>
                }
              </li>
            );
          })}
        </ul>
        }
      </div>
    </Dialog>
  );
};

export default template;