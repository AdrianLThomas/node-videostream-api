// tslint:disable:no-unused-expression

import { expect } from "chai";
import * as sinon from "sinon";

describe("InMemoryActiveUserRepository", () => {
	it("getWatchCountAsync: returns watchCount when username exists");
	it("getWatchCountAsync: returns watchCount of 0 when username doesn't exist");
	it("getWatchCountAsync: throws an error when username exists multiple times");
	it("setWatchCountAsync: updates the watchCount for a user when they already exist");
	it("setWatchCountAsync: adds an active user to the list the user doesn't exist");
});
