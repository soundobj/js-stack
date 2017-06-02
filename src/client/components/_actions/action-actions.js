/**
 * @module Actions
 */
function registerAction(payload) {
  return function (dispatch) {
    dispatch({ type: "REGISTER_ACTION", payload });
  };
}

function initAction(payload) {
  return function (dispatch) {
    dispatch({ type: "INIT_ACTION", payload });
  };
}

function next(payload) {
  return function (dispatch) {
    dispatch({ type: "NEXT_ACTION", payload });
  };
}

function addActionPayload(payload) {
  return function (dispatch) {
    dispatch({ type: "ADD_ACTION_PAYLOAD", payload });
  };
}

function previous(payload) {
  return function (dispatch) {
    dispatch({ type: "PREVIOUS_ACTION", payload });
  };
}

function disableAction(payload) {
  return function (dispatch) {
    dispatch({ type: "DISABLE_ACTION", payload });
  };
}

function cancelAction(payload) {
  return function (dispatch) {
    dispatch({ type: "CANCEL_ACTION", payload });
  };
}

function completeAction(payload) {
  return function (dispatch) {
    dispatch({ type: "COMPLETE_ACTION", payload });
  };
}

module.exports.registerAction = registerAction;
module.exports.initAction = initAction;
module.exports.cancelAction = cancelAction;
module.exports.completeAction = completeAction;
module.exports.next = next;
module.exports.previous = previous;
module.exports.disableAction = disableAction;
module.exports.addActionPayload = addActionPayload;