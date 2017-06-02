import "bootstrap/dist/css/bootstrap.css";
import "flag-icon-css/css/flag-icon.min.css";
import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import "../../dist/css/main.css";
import ActionsHandlers from "./components/actions/actionsHandler";
import Handlers from "./components/AppActionHandlers/handlers";

ActionsHandlers.setActionHandlers(Handlers);
ReactDOM.render(<Routes />, document.querySelector(".app"));