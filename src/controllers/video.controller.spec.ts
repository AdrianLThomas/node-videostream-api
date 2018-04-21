// tslint:disable:no-unused-expression

import { expect } from "chai";
import * as http from "http";
import * as sinon from "sinon";

import { VideoController } from "./video.controller";

describe("VideoController", () => {
	const watchCountLimit = 3;
	let controller: VideoController;
	let req: any = {};
	let res: any = {};

	beforeEach(function() {
		controller = new VideoController();
		req = { headers: sinon.spy() };
		res = { writeHead: sinon.spy(), end: sinon.spy() };
	});

	it("startVideo: increments watch count by one", function() {
		const initialWatchCount = 0;
		const expectedWatchCount = initialWatchCount + 1;

		controller.startVideo(req, res);

		expect(res.end.calledOnceWith(expectedWatchCount)).to.be.true;
	});

	it("startVideo: is not incremented higher than three", function() {
		const expectedCount = watchCountLimit;
		const startVideoTimes = 5;

		for (let i = 0; i < startVideoTimes; i++) {
			controller.startVideo(req, res);
		}

		expect(res.end.lastCall.calledWith(expectedCount)).to.be.true;
	});

	it("startVideo: returns status code 200 when watch count is less than or equal to three", function() {
		const expectedCount = 1;
		const expectedStatusCode = 200;

		controller.startVideo(req, res);

		expect(res.end.calledOnceWith(expectedCount)).to.be.true;
		expect(res.writeHead.calledOnceWith(expectedStatusCode));
	});

	it("startVideo: returns status code 403 when watch count is three", function() {
		const expectedCount = watchCountLimit;
		const expectedStatusCode = 403;

		for (let i = 0; i < watchCountLimit; i++) {
			controller.startVideo(req, res);
		}

		expect(res.end.lastCall.calledWith(expectedCount)).to.be.true;
		expect(res.writeHead.lastCall.calledWith(expectedStatusCode));
	});

	it("endVideo: decrements watch count");
	it("endVideo: is not decremented less than zero");
	it("endVideo: returns status code 200 when watch count is more than or equal to zero");
	it("endVideo: returns status code 403 when watch count is zero");
	it("count: returns watch count with status code 200");
});
