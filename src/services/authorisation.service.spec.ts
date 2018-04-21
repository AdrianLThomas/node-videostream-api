// tslint:disable:no-unused-expression

import * as assert from "assert";
import { expect } from "chai";
import { AuthenticationService } from "./authorisation.service";

describe("AuthorisationService", () => {
	let service: AuthenticationService;

	beforeEach(function() {
		service = new AuthenticationService();
	});

	it("isAuthorised: returns true if any string is provided", function() {
		expect(service.isAuthorised("Adrian")).to.be.true;
	});

	it("isAuthorised: returns false if nothing is provided", function() {
		expect(service.isAuthorised("")).to.be.false;
		expect(service.isAuthorised(null)).to.be.false;
		expect(service.isAuthorised(undefined)).to.be.false;
	});
});
