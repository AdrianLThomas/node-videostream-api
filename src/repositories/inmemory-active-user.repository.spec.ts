// tslint:disable:no-unused-expression

import { expect } from "chai";
import * as sinon from "sinon";
import * as TypeMoq from "typemoq";

describe("InMemoryActiveUserRepository", () => {
	it("getWatchCount: returns watchCount when username exists");
	it("getWatchCount: returns watchCount of 0 when username doesn't exist");
	it("getWatchCount: throws an error when username exists multiple times");
	it("setWatchCount: updates the watchCount for a user when they already exist");
	it("setWatchCount: adds an active user to the list the user doesn't exist");
});
