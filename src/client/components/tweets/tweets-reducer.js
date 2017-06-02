import Immutable from "immutable";

const initialState = Immutable.Map({
  tweets: [],
  fetching: false,
  fetched: false,
  error: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case "FETCH_TWEETS": {
      return { ...state, fetching: true };
    }
    case "FETCH_TWEETS_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    case "FETCH_TWEETS_FULFILLED": {
      return state.withMutations((map) => {
        map
          .set("tweets", action.payload)
          .set("fetching", false)
          .set("fetched", true);
      });
    }
    case "ADD_TWEET": {
      return {
        ...state,
        tweets: [...state.tweets, action.payload],
      };
    }
    case "UPDATE_TWEET": {
      console.error("@ UPDATE_TWEET", action.payload);
      return state;
      // const { id } = action.payload;
      // const newTweets = [...state.tweets];
      // const tweetToUpdate = newTweets.findIndex(tweet => tweet.id === id);
      // newTweets[tweetToUpdate] = action.payload;
      //
      // return {
      //   ...state,
      //   tweets: newTweets,
      // };
    }
    case "DELETE_TWEET": {
      return {
        ...state,
        tweets: state.tweets.filter(tweet => tweet.id !== action.payload),
      };
    }
    default: {
      return state;
    }
  }
}