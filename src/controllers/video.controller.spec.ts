import { expect } from "chai";
import * as http from "http";
import * as sinon from "sinon";

import { VideoController } from "./video.controller";

describe("VideoController", () => {
	let controller: VideoController;
	let req: any = {};
	let res: any = {};

	beforeEach(function() {
		controller = new VideoController();
		req = { headers: sinon.spy() };
		res = { writeHead: sinon.spy(), end: sinon.spy() };
	});

	it("startVideo: increments watch count by one", function() {
		const initialWatchCount = controller.watchCount;
		const expectedWatchCount = initialWatchCount + 1;
		controller.startVideo(req, res);
		const currentWatchCount = controller.watchCount;

		expect(currentWatchCount).to.be.equal(expectedWatchCount);
	});

	it("startVideo: is not incremented higher than three", function() {
		const expectedLimit = 3;
		const startVideoTimes = 5;

		for (let i = 0; i < startVideoTimes; i++) {
			controller.startVideo(req, res);
		}

		expect(controller.watchCount).to.be.equal(expectedLimit);
	});

	it("startVideo: returns status code 200 when watch count is less than or equal to three");
	it("startVideo: returns status code 403 when watch count is three");
	it("endVideo: decrements watch count");
	it("endVideo: is not decremented less than zero");
	it("endVideo: returns status code 200 when watch count is more than or equal to zero");
	it("endVideo: returns status code 403 when watch count is zero");
	it("count: returns watch count with status code 200");
});
