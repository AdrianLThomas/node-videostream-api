export class AuthenticationService {
	public isAuthorised(username: string): boolean {
		if (username && typeof username === "string") {
			return username.length > 0;
		}

		return false;
	}
}
