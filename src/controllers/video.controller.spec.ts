// tslint:disable:no-unused-expression

import { expect } from "chai";
import * as chai from "chai";
import * as should from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as http from "http";
import * as sinon from "sinon";
chai.use(chaiAsPromised);
chai.should();

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

	it("startVideoAsync: increments watch count by one", async function() {
		const initialWatchCount = 0;
		const expectedWatchCount = initialWatchCount + 1;

		await controller.startVideoAsync(req, res);

		res.end.calledOnceWith(expectedWatchCount.toString()).should.be.true;
	});

	it("startVideoAsync: is not incremented higher than three", async function() {
		const expectedCount = watchCountCeiling;
		const startVideoTimes = 5;

		for (let i = 0; i < startVideoTimes; i++) {
			await controller.startVideoAsync(req, res);
		}

		res.end.lastCall.calledWith(expectedCount.toString()).should.be.true;
	});

	it("startVideoAsync: returns status code 200 when watch count is 1", async function() {
		const expectedCount = 1;
		const expectedStatusCode = 200;

		await controller.startVideoAsync(req, res);

		res.end.calledOnceWith(expectedCount.toString()).should.be.true;
		res.writeHead.calledOnceWith(expectedStatusCode).should.be.true;
	});

	it("startVideoAsync: returns status code 200 when watch count is 3", async function() {
		const expectedCount = 3;
		const expectedStatusCode = 200;

		for (let i = 0; i < expectedCount; i++) {
			await controller.startVideoAsync(req, res);
		}

		res.end.lastCall.calledWith(expectedCount.toString()).should.be.true;
		res.writeHead.lastCall.calledWith(expectedStatusCode).should.be.true;
	});

	it("endVideoAsync: decrements watch count by one", async function() {
		const initialWatchCount = 1;
		const expectedWatchCount = 2;

		for (let i = 0; i < 3; i++) {
			await controller.startVideoAsync(req, res);
			console.log("startVideo called");
		}

		await controller.endVideoAsync(req, res);
		console.log("endVideoAsync called");
		res.end.calledWith(expectedWatchCount.toString()).should.be.true;
		console.log("assert called");
	});

	it("endVideoAsync: is not decremented less than zero", async function() {
		const expectedCount = watchCountFloor;

		await controller.endVideoAsync(req, res);

		res.end.lastCall.calledWith(expectedCount.toString()).should.be.true;
	});

	it("endVideoAsync: returns status code 200 when watch count is 1", async function() {
		const expectedCount = 0;
		const expectedStatusCode = 200;

		await controller.startVideoAsync(req, res);
		await controller.endVideoAsync(req, res);

		res.end.lastCall.calledWith(expectedCount.toString()).should.be.true;
		res.writeHead.lastCall.calledWith(expectedStatusCode).should.be.true;
	});

	it("endVideoAsync: returns status code 200 when watch count is 2", async function() {
		const expectedCount = 2;
		const expectedStatusCode = 200;

		for (let i = 0; i < 3; i++) {
			await controller.startVideoAsync(req, res);
		}
		await controller.endVideoAsync(req, res);

		res.end.lastCall.calledWith(expectedCount.toString()).should.be.true;
		res.writeHead.lastCall.calledWith(expectedStatusCode).should.be.true;
	});

	it("endVideoAsync: returns status code 403 when watch count is zero", async function() {
		const expectedCount = watchCountFloor;
		const expectedStatusCode = 403;

		await controller.endVideoAsync(req, res);

		res.end.lastCall.calledWith(expectedCount.toString()).should.be.true;
		res.writeHead.lastCall.calledWith(expectedStatusCode).should.be.true;
	});

	it("countAsync: returns watch count with status code 200", async function() {
		const expectedCount = watchCountFloor;
		const expectedStatusCode = 200;

		await controller.countAsync(req, res);

		res.end.lastCall.calledWith(expectedCount.toString()).should.be.true;
		res.writeHead.lastCall.calledWith(expectedStatusCode).should.be.true;
	});
});
