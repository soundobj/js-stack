/*!
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

/**
 * Dialog footercomponent
 *
 * @class DialogFooter
 * @constructor
 * @return {Function}
 */
export default class Footer extends React.Component {
  render() {
    return this.props.children;
  }
}

Footer.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};