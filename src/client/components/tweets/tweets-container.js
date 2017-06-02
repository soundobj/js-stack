import { connect } from "react-redux";
import Tweets from "./tweets";
import { fetchTweets, editTweet } from "./tweets-actions";
import { notifyStatus } from "../notification/status/status-actions";

const mapStateToProps = (state) => {
  return {
    tweets: state.get("tweets"),
    actions: state.get("actions"),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchTweets: () => { dispatch(fetchTweets()); },
  editTweet: () => { return dispatch(editTweet()); }, // return the promise so we can .then()
  notifyStatus: (payload) => { return dispatch(notifyStatus(payload)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tweets);