/* global it */
/* global describe */
/* global beforeEach */
/* global afterEach */
import { expect } from "chai";
import sinon from "sinon/pkg/sinon";
import BrowserCookies from "browser-cookies";
import store from "../../store";
import transitionHandler from "../transitionHandler";

let nextStateStub;
let replaceStub;
let callbackStub;

beforeEach(() => {
  nextStateStub = {
    location: {
      pathname: "/notes",
      search: "bar",
    },
  };
  replaceStub = sinon.stub();
  callbackStub = sinon.stub();
});

describe("api.transitionHandler", () => {
  it("redirect to login if not auth cookie found", () => {
    const browserCookiesGetStub = sinon.stub(BrowserCookies, "get");
    const storeGetStateStub = sinon.stub(store, "getState").returns({
      toJS: () => {
        return {};
      },
    });

    transitionHandler(nextStateStub, replaceStub, callbackStub);
    expect(replaceStub.lastCall.args[0]).to.eql("/login?from=/notesbar");
    browserCookiesGetStub.restore();
    storeGetStateStub.restore();
  });
});