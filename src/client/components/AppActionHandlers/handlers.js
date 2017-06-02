/*
 *
 * All rights reserved. Copyright (c) Ixxus Ltd 2015
 *
 * @author Matt Dunn
 *
 */

/**
 * @module Proof
 */

import $ from "jquery";
// import localeData from "../locale/en-US/main";
import EditTweet from "./editTweet";

export default $.extend({},
  EditTweet
);

// define([
//   "jquery",
//
//   "app-locale/main",
//   "./actions/locale/en-US/main",
//
//   "jsx!./actions/createProofingTask.react",
//   "jsx!./actions/reassignProofingTask.react",
//   "jsx!./actions/createProofingTaskParticipant.react",
//
//   "jsx!./actions/proofingTask.react",
//   "jsx!./actions/completeProofingTask.react",
//   "jsx!./actions/completeProofingTaskForCurrentUser.react",
//
//   "jsx!./actions/closeProofingJob.react",
//   "jsx!./actions/cancelProofingRound.react"
// ], function(
//   $,
//
//   appLocaleData,
//   localeData,
//
//   createProofingTask,
//   createProofingTaskParticipant,
//
//   proofingTask,
//   completeProofingTask,
//   reassignProofingTask,
//   completeProofingTaskForCurrentUser,
//
//   closeProofingJob,
//   cancelProofingRound
// ) {
//   "use strict";
//
//   // Extend app locale with component locale
//   $.extend(true, appLocaleData, localeData);
//
//   return $.extend({},
//     createProofingTask,
//     createProofingTaskParticipant,
//
//     proofingTask,
//     completeProofingTask,
//     reassignProofingTask,
//     completeProofingTaskForCurrentUser,
//
//     closeProofingJob,
//     cancelProofingRound
//   );
// });