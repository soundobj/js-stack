import UriTemplate from "uri-template.js";
import parseLinkHeader from "parse-link-header";
import store from "../store";
import { isEmpty } from "./val-utils";
import { pushNotification } from "../components/notification/notification-actions";

/**
 *
 * @param {Object} action the action to execute
 * @param {Object} payload the payload to send
 * @param {Object} params the params to url template
 * @param {String} url a url to override the action url
 * @param {Boolean} paginated if the action results are paginated
 */
function execAction(action, payload, params, url, paginated) {
  let rel = action.rel;
  let links;

  if (!action) {
    throw new Error("A valid action must be present");
  }

  if (action.params && action.params.length && isEmpty(params)) {
    throw new Error("A valid payload must be present", action.params.length);
  }

  if (params) {
    rel = UriTemplate.expand(action.rel, params);
  }

  const headers = (payload) ? {
    Accept: "application/json",
    "Content-Type": "application/json",
  } : null;

  return new Promise((resolve, reject) => {
    store.dispatch({ type: `${action.action}`, payload: null });
    console.error("@ URL", action);
    fetch(url || rel, {
      headers,
      credentials: "include",
      method: action.method,
      body: payload ? JSON.stringify(payload) : null,
    })

      .then((response) => {
        // notify statuses other than 200s
        if (!(response.status > 199 && response.status < 300)) {
          const error = {
            status: response.status,
            error: response.statusText,
            request: response.url,
          };

          store.dispatch(pushNotification(error));
          store.dispatch({ type: `${action.action}_REJECTED`, payload: error });
          // store.dispatch({ type: "CANCEL_ACTION", payload: null});
          reject(response);
        }

        if (paginated) {
          links = parseLinkHeader(response.headers.get("Link"));
        }

        return response.json();
      })

      .then((payload) => {
        resolve(payload);
        if (payload) {
          store.dispatch({
            type: `${action.action}_FULFILLED`,
            payload: { payload, links },
          });
        }
      })

      .catch((ex) => {
        reject(ex);
        store.dispatch({ type: `${action.action}_REJECTED`, payload: ex });
      });
  });
}

module.exports.execAction = execAction;