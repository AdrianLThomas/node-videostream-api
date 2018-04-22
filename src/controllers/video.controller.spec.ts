// tslint:disable:no-unused-expression

import { expect } from "chai";
import * as http from "http";
import * as sinon from "sinon";

import { InMemoryActiveUserRepository } from "../repositories/inmemory-active-user.repository";
import { VideoController } from "./video.controller";

describe("VideoController", () => {
	const watchCountCeiling = 3;
	const watchCountFloor = 0;
	let controller: VideoController;
	let req: any = {};
	let res: any = {};

	beforeEach(function() {
		controller = new VideoController(new InMemoryActiveUserRepository());
		req = { headers: sinon.spy() };
		res = { writeHead: sinon.spy(), end: sinon.spy() };

		req.headers["x-username"] = "test-user";
	});

	it("startVideo: increments watch count by one", function() {
		const initialWatchCount = 0;
		const expectedWatchCount = initialWatchCount + 1;

		controller.startVideo(req, res);

		expect(res.end.calledOnceWith(expectedWatchCount.toString())).to.be.true;
	});

	it("startVideo: is not incremented higher than three", function() {
		const expectedCount = watchCountCeiling;
		const startVideoTimes = 5;

		for (let i = 0; i < startVideoTimes; i++) {
			controller.startVideo(req, res);
		}

		expect(res.end.lastCall.calledWith(expectedCount.toString())).to.be.true;
	});

	it("startVideo: returns status code 200 when watch count is 1", function() {
		const expectedCount = 1;
		const expectedStatusCode = 200;

		controller.startVideo(req, res);

		expect(res.end.calledOnceWith(expectedCount.toString())).to.be.true;
		expect(res.writeHead.calledOnceWith(expectedStatusCode)).to.be.true;
	});

	it("startVideo: returns status code 200 when watch count is 3", function() {
		const expectedCount = 3;
		const expectedStatusCode = 200;

		for (let i = 0; i < expectedCount; i++) {
			controller.startVideo(req, res);
		}

		expect(res.end.lastCall.calledWith(expectedCount.toString())).to.be.true;
		expect(res.writeHead.lastCall.calledWith(expectedStatusCode)).to.be.true;
	});

	it("endVideo: decrements watch count by one", function() {
		const initialWatchCount = 1;
		const expectedWatchCount = 2;

		for (let i = 0; i < 3; i++) {
			controller.startVideo(req, res);
		}

		controller.endVideo(req, res);
		expect(res.end.calledWith(expectedWatchCount.toString())).to.be.true;
	});

	it("endVideo: is not decremented less than zero", function() {
		const expectedCount = watchCountFloor;

		controller.endVideo(req, res);

		expect(res.end.lastCall.calledWith(expectedCount.toString())).to.be.true;
	});

	it("endVideo: returns status code 200 when watch count is 1", function() {
		const expectedCount = 0;
		const expectedStatusCode = 200;

		controller.startVideo(req, res);
		controller.endVideo(req, res);

		expect(res.end.lastCall.calledWith(expectedCount.toString())).to.be.true;
		expect(res.writeHead.lastCall.calledWith(expectedStatusCode)).to.be.true;
	});

	it("endVideo: returns status code 200 when watch count is 2", function() {
		const expectedCount = 2;
		const expectedStatusCode = 200;

		for (let i = 0; i < 3; i++) {
			controller.startVideo(req, res);
		}
		controller.endVideo(req, res);

		expect(res.end.lastCall.calledWith(expectedCount.toString())).to.be.true;
		expect(res.writeHead.lastCall.calledWith(expectedStatusCode)).to.be.true;
	});

	it("endVideo: returns status code 403 when watch count is zero", function() {
		const expectedCount = watchCountFloor;
		const expectedStatusCode = 403;

		controller.endVideo(req, res);

		expect(res.end.lastCall.calledWith(expectedCount.toString())).to.be.true;
		expect(res.writeHead.lastCall.calledWith(expectedStatusCode)).to.be.true;
	});

	it("count: returns watch count with status code 200", function() {
		const expectedCount = watchCountFloor;
		const expectedStatusCode = 200;

		controller.count(req, res);

		expect(res.end.lastCall.calledWith(expectedCount.toString())).to.be.true;
		expect(res.writeHead.lastCall.calledWith(expectedStatusCode)).to.be.true;
	});
});
