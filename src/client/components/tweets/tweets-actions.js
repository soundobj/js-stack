import Q from "q";
import config from "../../config/config";

export function fetchTweets() {
  return function (dispatch) {
    fetch(`${config.api}/tweets`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        dispatch({ type: "FETCH_TWEETS_FULFILLED", payload: json });
      })
      .catch((ex) => {
        dispatch({ type: "FETCH_TWEETS_REJECTED", payload: ex });
      });
  };
}

export function editTweet() {
  return function (dispatch) {
    const defer = Q.defer();
    console.error("@ tweets-actions editTweet dispatch");
    // @TODO: remove the fakePromise for the real mckoy
    setTimeout(() => {
      console.error("@ I successfully fake the persistence of the edit tweet", defer);
      dispatch({ type: "UPDATE_TWEET", payload: "tweetEdited" });
      defer.resolve("done");
    }, 10);
    return defer.promise;
  };
}