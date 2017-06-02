/* global it */
/* global describe */
/* global beforeEach */
/* global afterEach */
import { expect } from "chai";

import { revertChanges } from "../diffTool-utils";

describe("components.diffTool-utils", () => {
  it("reverts removed section of the string marked as to be reverted", () => {
    const parts = [
      {
        count: 1,
        index: 0,
        value: "u",
      },
      {
        added: undefined,
        count: 2,
        index: 1,
        removed: true,
        revert: true,
        value: "nd",
      },
      {
        count: 1,
        index: 2,
        value: "e",
      },
      {
        count: 3,
        index: 3,
        value: " ne",
        removed: true,
        revert: false,
      },
      {
        count: 9,
        index: 4,
        value: "mo minima",
      },
      {
        added: true,
        revert: true,
        count: 4,
        index: 5,
        value: " 111",
      },
    ];
    const res = revertChanges(parts);
    expect(res).to.eql("undemo minima");
  });

  const parts1 = [
    {
      count: 1,
      index: 0,
      value: "u",
    },
    {
      added: undefined,
      count: 2,
      index: 1,
      removed: true,
      revert: true,
      value: "nd",
    },
    {
      count: 1,
      index: 2,
      value: "e",
    },
    {
      count: 3,
      index: 3,
      value: " ne",
      removed: true,
      revert: true,
    },
    {
      count: 9,
      index: 4,
      value: "mo minima",
    },
    {
      added: true,
      revert: true,
      count: 4,
      index: 5,
      value: " 111",
    },
  ];
  const res1 = revertChanges(parts1);
  expect(res1).to.eql("unde nemo minima");

  const parts2 = [
    {
      count: 1,
      index: 0,
      value: "u",
    },
    {
      added: undefined,
      count: 2,
      index: 1,
      removed: true,
      revert: true,
      value: "nd",
    },
    {
      count: 1,
      index: 2,
      value: "e",
    },
    {
      count: 3,
      index: 3,
      value: " ne",
      removed: true,
      revert: true,
    },
    {
      count: 9,
      index: 4,
      value: "mo minima",
    },
    {
      added: true,
      revert: false,
      count: 4,
      index: 5,
      value: " 111",
    },
  ];
  const res2 = revertChanges(parts2);
  expect(res2).to.eql("unde nemo minima 111");
});