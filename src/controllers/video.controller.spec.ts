import * as assert from "assert";
import { should } from "chai";
import { expect } from "chai";
should();

describe("video controller", () => {
	it("startVideo: increments watch count");
	it("startVideo: is not incremented higher than three");
	it("startVideo: returns status code 200 when watch count is less than or equal to three");
	it("startVideo: returns status code 403 when watch count is three");
	it("endVideo: decrements watch count");
	it("endVideo: is not decremented less than zero");
	it("endVideo: returns status code 200 when watch count is more than or equal to zero");
	it("endVideo: returns status code 403 when watch count is zero");
	it("count: returns watch count with status code 200");
});
