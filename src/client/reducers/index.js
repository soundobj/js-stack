import { combineReducers } from "redux-immutable";
import tweets from "../components/tweets/tweets-reducer";
import action from "../components/actions/action-reducer";
import _action from "../components/_actions/action-reducer";
import status from "../components/notification/status/status-reducer";
import notes from "../components/notes/notes-reducer";
import board from "../components/board/board-reducer";
import lists from "../components/board/lists-reducer";
import participants from "../components/participants/participants-reducer";
import notification from "../components/notification/notification-reducer";
import user from "../components/user/user-reducer";

export default combineReducers({
  tweets, action, status, notes, user, notification, _action, participants, board, lists,
});