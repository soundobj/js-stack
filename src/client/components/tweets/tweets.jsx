import React from "react";
import { Button } from "react-bootstrap";

// @TODO:(DD) export default () => does not allow to later on bind this
// from the react component so using function instead
const template = function () {
  const tweets = this.props.tweets ? this.props.tweets.toJS().tweets : [];

  console.error("@ rendering", this.props);

  if (!tweets.length) {
    // return (<button onClick={this.fetchTweets.bind(this)}>load tweets</button>);
    return (
      <div>
        <button className="load-tweets" onClick={this.props.fetchTweets}>load tweets</button>
        <Button
          onClick={this.handleEditTweet}
          bsStyle="primary"
          bsSize="large"
        >
          Edit Tweet
        </Button>
      </div>
    );
  }

  const mappedTweets = tweets.map(tweet => <li key={tweet.id}>{tweet.text}</li>);

  return (
    <div>
      <h1 className="navbar"><span className="glyphicon glyphicon-heart" />TWEETS</h1>
      <ul className="tweets">{mappedTweets}</ul>
    </div>
  );
};

export default template;