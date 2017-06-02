/*
 *
 * All rights reserved. Copyright (c) Ixxus Ltd 2015
 *
 * @author Matt Dunn
 *
 */

/**
 * Action handler data
 * @class HandlerContainer
 * @param {Object|HandlerContainer} container
 * @constructor
 */
export default function (container) {
  /**
   * Action data
   * @property data
   * @type {Object}
   */
  this.data = (container || {}).data;
  this.store = (container || {}).store;

  /**
   * Action payload
   *
   * The payload is merged in each handler step
   *
   * @property payload
   * @type {Object}
   */
  this.payload = (container || {}).payload;
}