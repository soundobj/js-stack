import React from "react";
import { Router, Route, hashHistory } from "react-router";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { language, messages } from "./i18n";
import store from "./store";
import Notes from "./components/notes/notes-container";
import Board from "./components/board/board-container";
import Version from "./components/version/version";
import NotFound from "./components/notFound/notFound";
import Navbar from "./components/navbar/navbar-container";
// import ActionContainer from "./components/actionContainer/actionContainer-container";
import ActionContainer from "./components/_actions/actionContainer-container";
import Login from "./components/login/login-container";
import Status from "./components/notification/status/status-container";
import Notification from "./components/notification/notification-container";
import Config from "../../config.json";
import transitionHandler from "./api/transitionHandler";
import { clearNotifications } from "./components/notification/notification-actions";
import { cancelAction } from "./components/_actions/action-actions";
import { registerHandlers } from "./components/_actions/handlers";

registerHandlers();

const Container = (props) => {
  return (
    <div className="HolyGrail">
      <ActionContainer />
      <Status />
      <header className="HolyGrail-header">
        <div className="Header Header--cozy" role="banner">
          { // eslint-disable-next-line global-require
          }<Navbar appLogo={require("./sass/i/logo.png")} appName={Config.appName} />
          <Notification />
        </div>
      </header>
      <main className="HolyGrail-body">
        {props.children}
      </main>
      <footer className="HolyGrail-footer">
        <div className="Footer">
          Footer madness
        </div>
      </footer>
    </div>
  );
};

const handleRedirect = () => {
  const state = store.getState().toJS();
  if (state.notification.notifications.length) {
    store.dispatch(clearNotifications());
  }
  if (state._action.action) {
    store.dispatch(cancelAction());
  }
};

Container.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

export default () => {
  return (
    <IntlProvider locale={language} messages={messages}>
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path="/" component={Container} onEnter={(nextState, replace) => nextState.location.pathname === "/" && replace("/notes")}>
            <Route path="/version" component={Version} onEnter={transitionHandler} onLeave={handleRedirect} />
            <Route path="/notes" component={Notes} onEnter={transitionHandler} onLeave={handleRedirect} />
            <Route path="/lists" component={Board} onEnter={transitionHandler} onLeave={handleRedirect} />
            <Route path="/login" component={Login} />
            <Route path="*" component={NotFound} />
          </Route>
        </Router>
      </Provider>
    </IntlProvider>
  );
};

/**
 * MAIN LAYOUT SAMPLE
 */
// export default () => {
//   return (
//    <div className="HolyGrail">
//      <header className="HolyGrail-header">
//        <div className="Header Header--cozy" role="banner">
//          this is the header
//        </div>
//      </header>
//      <main className="HolyGrail-body">
//        <article className="HolyGrail-content">
//          <h1>this is the article title</h1>
//          this is the article content
//        </article>
//        <nav className="HolyGrail-nav u-textCenter">
//          <strong>Navigation</strong>
//        </nav>
//        <aside className="HolyGrail-ads u-textCenter">
//          <strong>Advertisements</strong>
//        </aside>
//      </main>
//      <footer className="HolyGrail-footer">
//        <div className="Footer">
//          this is the footer
//        </div>
//      </footer>
//    </div>
//   );
// };