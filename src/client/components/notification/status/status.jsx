/*
 *
 * All rights reserved. Copyright (c) Ixxus Ltd 2016
 *
 * @author Matt Dunn
 *
 */

import React from "react";
import { Fade } from "react-bootstrap";

/**
 * @module Status
 */

const template = function () {
  const status = this.props.status ? this.props.status.toJS() : {};
  // @TODO: Component needs to be wrapped in a portal so that is not a child of it's parent element
  return (
    <Fade in={status.show}>
      <section className="component__notification__status">
        {status ?
          <div className="component__notification__status__content">
            <div className="component__notification__status__content__message">
              {status.message}
            </div>
            {status.isSuccess &&
              <div className="component__notification__status__OK glyphicon glyphicon-ok" />
            }
          </div>
          :
          null}
      </section>
    </Fade>
  );
};

export default template;