import * as assert from "assert";
import { should } from "chai";
import { expect } from "chai";
should();

describe("Basic Mocha Test", () => {
  it("should deal with objects", function() {
    const obj = { name: "Adrian", gender: "Male" };
    const objB = { name: "Adrian", gender: "Male" };

    obj.should.deep.equal(objB);
  });
});
