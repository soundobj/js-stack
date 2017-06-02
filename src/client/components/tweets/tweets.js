import React, { PropTypes } from "react";
// import { connect } from "react-redux";
// import { fetchTweets } from "../../actions/tweet-actions";
import ActionsHandler from "../actions/actionsHandler";
import Action from "../actions/action";
import HandlerContainer from "../actions/handlerContainer";
// import LoadingHOC from "../../components/loadingHOC/loadingHOC";
import template from "./tweets.jsx";
import "./tweets.scss";

// @TODO(DD) investigate whether is possible to easily mock or stub the @connect
// in tests
// @connect((store) => {
//   return {
//     store,
//   };
// })

// @LoadingHOC('tweets.tweets');
class Tweets extends React.Component {
  // fetchTweets() {
  //   // this.props.dispatch(fetchTweets());
  // }


  constructor(props) {
    super(props);
    this.handleEditTweet = this.handleEditTweet.bind(this);
  }

  handleEditTweet() {
    ActionsHandler.execAction(new Action({
      asynchronous: null,
      code: "editTweet",
      expectedArgs: [],
      group: "TWEET",
      method: "POST",
      publish: null,
      rel: "editTweet",
      targetObject: "Tweet",
    }), new HandlerContainer({
      data: {
        handlerContainerData: true,
      },
      store: this.context.store,
    }),
      // @TODO: should context actions should be passed as props instead of connected via redux??
      { editTweet: this.props.editTweet },
      this.context.store
    );
  }

  render() {
    this.render = template;
    return this.render.call(this);
  }
}

Tweets.propTypes = {
  fetchTweets: PropTypes.func.isRequired,
  editTweet: PropTypes.func.isRequired,
  tweets: PropTypes.object.isRequired,
};

Tweets.contextTypes = {
  store: React.PropTypes.object,
};

export default Tweets;