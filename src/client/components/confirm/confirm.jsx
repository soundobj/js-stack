import React from "react";
import Dialog from "../dialog/dialog";

const template = function () {
  return (
    <Dialog
      open={true}
      onClose={this.handleClose}
      title={this.props.title}
      actions={[
        {
          label: "cancel",
        },
        {
          code: "confirm",
          label: "confirm",
          severity: this.props.actionSeverity,
          // disabled: actionConfirmMessages && actionConfirmMessages.length > 0 && this.state.confirmActionDisabled,
        },
      ]}
    >
      <div>
        {this.props.children}
      </div>
    </Dialog>
  );
};

export default template;