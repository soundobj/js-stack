/*
 *
 * All rights reserved. Copyright (c) Ixxus Ltd 2015
 *
 * @author Matt Dunn
 *
 */
/**
 * Handle an action by calling an action creator action method
 * @param {Function} handleAction
 * @constructor
 */
export default function HandleAction(handleAction) {
  return function handle(context, action, container, handleComplete, contextActions) {
    const performAction = () => {
      handleAction(contextActions)(
        container.data,
        action.getRel(container.data),
        action.getParameters(container.payload),
        performAction
      )
        .then((data) => {
          handleComplete.resolve({
            payload: data,
          });
        })
        .fail((ex) => {
          handleComplete.reject(ex);
        });
    };

    performAction();
  };
}