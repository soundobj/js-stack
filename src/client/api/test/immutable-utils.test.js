/* global it */
/* global describe */
/* global beforeEach */
/* global afterEach */
import { expect } from "chai";

import Immutable from "immutable";
import { updateObjectListByProperty } from "../immutable-utils";

describe("api.ImmutableUtils", () => {
  it("updates the list", () => {
    const state = Immutable.Map({
      items: Immutable.List(Immutable.fromJS([
        { id: 0, val: "foo" },
        { id: 1, val: "bar" },
        { id: 2, val: "baz" },
      ])),
    });

    const list = {
      items: [
        { id: 0, val: "fooUpdated" },
        { id: 1, val: "bar" },
        { id: 2, val: "baz" },
        { id: 3, val: "newVal" },
      ],
    };

    const newState = updateObjectListByProperty(state, "items", list.items);

    expect(newState.toJS()).to.eql({
      items: [
        { id: 0, val: "fooUpdated" },
        { id: 1, val: "bar" },
        { id: 2, val: "baz" },
        { id: 3, val: "newVal" },
      ],
    });
  });

  it("doesn't updates the list if the property is incorrect", () => {
    const state = Immutable.fromJS({
      items: [
        { id: 0, val: "foo" },
        { id: 1, val: "bar" },
        { id: 2, val: "baz" },
      ],
    });

    const list = {
      peppers: [
        { id: 0, val: "fooUpdated" },
        { id: 1, val: "bar" },
        { id: 3, val: "newVal" },
      ],
    };

    const newState = updateObjectListByProperty(state, "items", list.items, "peppers");
    expect(newState.toJS()).to.eql({
      items: [
        { id: 0, val: "foo" },
        { id: 1, val: "bar" },
        { id: 2, val: "baz" },
      ],
    });
  });

  it("doesn't updates the list if the key is incorrect", () => {
    const state = Immutable.fromJS({
      items: [
        { id: 0, val: "foo" },
        { id: 1, val: "bar" },
        { id: 2, val: "baz" },
      ],
    });

    const list = {
      peppers: [
        { id: 0, val: "fooUpdated" },
        { id: 1, val: "bar" },
        { id: 3, val: "newVal" },
      ],
    };

    const newState = updateObjectListByProperty(state, "tomatoes", list.items, "id");
    expect(newState.toJS()).to.eql({
      items: [
        { id: 0, val: "foo" },
        { id: 1, val: "bar" },
        { id: 2, val: "baz" },
      ],
    });
  });

  it("doesn't updates the list if the list is empty", () => {
    const state = Immutable.fromJS({
      items: [],
    });

    const list = {
      peppers: [
        { id: 0, val: "fooUpdated" },
        { id: 1, val: "bar" },
        { id: 3, val: "newVal" },
      ],
    };

    const newState = updateObjectListByProperty(state, "tomatoes", list.items, "id");
    expect(newState.toJS()).to.eql({
      items: [],
    });
  });
});