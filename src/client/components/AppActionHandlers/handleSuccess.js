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
import { notifyStatus } from "../notification/status/status-actions";
// "components/api/utils/action",
// "components/notifications/notificationsActions"
// @TODO connect redux actions to trigger store change and show status

export default function HandleSuccess(context, action, container, handleComplete) {
  console.error("@ handle success enter", container);

  container.store.dispatch(notifyStatus({
    isSuccess: true,
    message: "TODO make this dynamic, but successfully edited tweet",
    show: true,
  }));

  handleComplete.resolve();


  return function handle(context, action, container, handleComplete) {
    console.error("@ TODO: notify status redux action here", context, action, container, handleComplete);
    container.store.dispatch(notifyStatus({
      isSuccess: true,
      message: "TODO make this dynamic, but successfully edited tweet",
      show: true,
    }));

    handleComplete.resolve();
  };
}