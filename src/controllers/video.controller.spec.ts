import * as assert from "assert";
import { should } from "chai";
import { expect } from "chai";
should();

describe("VideoController", () => {
	it("StartVideo: increments watch count");
	it("StartVideo: is not incremented higher than three");
	it("StartVideo: returns status code 200 when watch count is less than or equal to three");
	it("StartVideo: returns status code 403 when watch count is three");
	it("EndVideo: decrements watch count");
	it("EndVideo: is not decremented less than zero");
	it("EndVideo: returns status code 200 when watch count is more than or equal to zero");
	it("EndVideo: returns status code 403 when watch count is zero");
	it("Count: returns watch count with status code 200");
});
