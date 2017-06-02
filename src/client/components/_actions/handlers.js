/* registers available handlers to the _actions store */
import { registerAction } from "./action-actions";
import store from "../../store";
import { addNote } from "./handlers/addNote/addNote";
import { compareVersion } from "./handlers/compareVersion/compareVersion";

export function registerHandlers() {
  store.dispatch(registerAction({ name: "addNote", action: addNote }));
  store.dispatch(registerAction({ name: "compareVersion", action: compareVersion }));
}