/*
 *
 * All rights reserved. Copyright (c) Ixxus Ltd 2015
 *
 * @author Matt Dunn
 *
 */
/**
 * @module
 */
import Handler from "../actions/handler";
//  "components/api/utils/action",
// import ActionsHandler from "../actions/actionsHandler";
import HandleAction from "../actions/handlers/handleAction";
import HandleConfirm from "../AppActionHandlers/handleConfirm";
import HandleSuccess from "../AppActionHandlers/handleSuccess";

export default {
  editTweet: new Handler.ActionHandler({
    getLabelDetails: (/* action */) => {
      return {
        // label: ActionUtils.getActionLabelCode(action)
        label: "EditTweetAction",
      };
    },
  }, () => {
    return new Handler((context, action, container, handleComplete) => {
      console.error("@ edit tweet chain starts", null);
      return handleComplete.resolve({ payload: null });
    })
      .then(new HandleConfirm())
      .then((context, action, container, handleComplete) => {
        console.error("@ after confirm chain", null);
        handleComplete.resolve({
          payload: {
            tweetId: "TODO tweet id",
            // participantId: container.data.participant.participantId,
            // recipient: container.data.participant
          },
        });
      })
      .then(new HandleAction((contextActions) => {
        console.error("@ TODO fire contextActions to actually edit the tweet it must return a promise", contextActions);
        return contextActions.editTweet;
      }))
      .then((context, action, container, handleComplete) => {
        console.error("@ handleSuccess enter", arguments);
        return new HandleSuccess(context, action, container, handleComplete);
      })
      .then((context, action, container, handleComplete, /* contextActions */) => {
        handleComplete.resolve();
        console.error("@ TODO do any tasks that need to be done after action success", null);
        // contextActions.loadTasks();
        // contextActions.loadProof();
      });
  }),
};