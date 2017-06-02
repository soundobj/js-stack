/* global it */
/* global describe */
/* global beforeEach */
import React from "react";
import { render } from "enzyme"; /* mount  shallow */
import { expect } from "chai";
// import sinon from "sinon/pkg/sinon";
import Component from "../tweets";

let props;

beforeEach(() => {
  props = {
    tweets: {
      toJS: () => {
        return {
          tweets: [
            {
              text: "json server tweet!",
              id: "5783d9c3917a640100f1890e",
            },
            {
              id: "5862ec89539650010022f295",
              text: "Tweeting tweets .. tweet .. tweet",
            },
            {
              id: "58659b75cafefd0100d765f2",
              text: "last tweet",
            },
          ],
        };
      },
    },
  };
});

describe("components.tweets", () => {
  it("contains spec with an expectation", () => {
    // fake no tweets so the "load tweets" button is rendered
    props.tweets.toJS = () => {
      return {
        tweets: [],
      };
    };

    // const fetchTweetsStub = sinon.stub();
    // const component = mount(<Component tweets={props.tweets} fetchTweets={fetchTweetsStub} />);
    // component.find(".load-tweets").simulate("click");
    // expect(fetchTweetsStub.calledOnce).to.equal(true);
  });
  it("renders tweets", () => {
    // Use require("util").inspect()); to log Cheerio DOM
    const component = render(<Component tweets={props.tweets} />);
    expect(component.find(".navbar").length).to.eql(1);
    expect(component.find(".tweets li").length).to.eql(3);
    expect(component.find(".tweets li")[0].children[0].data).to.eql("json server tweet!");
    expect(component.find(".tweets li")[1].children[0].data).to.eql("Tweeting tweets .. tweet .. tweet");
  });
});