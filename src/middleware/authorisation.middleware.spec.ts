// tslint:disable:no-unused-expression

import { expect } from "chai";
import * as sinon from "sinon";
import * as TypeMoq from "typemoq";

import { AuthorisationService } from "../services/authorisation.service";
import { AuthorisationMiddleware } from "./authorisation.middleware";

describe("AuthorisationMiddleware", () => {
	let authMiddleware: AuthorisationMiddleware;
	let req: any = {};
	let res: any = {};

	beforeEach(function() {
		const authServiceMock = TypeMoq.Mock.ofType(AuthorisationService);
		authMiddleware = new AuthorisationMiddleware(authServiceMock.object);
		authServiceMock.setup((obj) => obj.isAuthorised(undefined))
									 .returns(() => false);
		authServiceMock.setup((obj) => obj.isAuthorised("Adrian"))
									 .returns(() => true);

		req = { headers: sinon.spy() };
		res = { writeHead: sinon.spy(), end: sinon.spy() };
	});

	it("isAuthorised writes status code 401 if unauthorised", function() {
		req.headers.authorization = undefined;

		authMiddleware.isAuthorised(req, res);

		expect(res.writeHead.calledOnceWith(401)).to.be.true;
		expect(res.end.calledOnce).to.be.true;
	});

	it("isAuthorised returns true if authorised", function() {
		req.headers["x-username"] = "Adrian";

		const isAuth = authMiddleware.isAuthorised(req, res);

		expect(isAuth).to.be.true;
		expect(res.writeHead.notCalled).to.be.true;
	});
});
