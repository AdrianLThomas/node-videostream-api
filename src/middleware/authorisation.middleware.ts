import { AuthorisationService } from "../services/authorisation.service";

export class AuthorisationMiddleware {

	constructor(private readonly authService: AuthorisationService) {
	}

	public isAuthorised(req, res): boolean {
		if (this.authService.isAuthorised(req.headers["x-username"])) {
			return true;
		}

		res.writeHead(401);
		res.end();
		return false;
	}
}
