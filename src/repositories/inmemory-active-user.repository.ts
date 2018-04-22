import { IActiveUserRepository } from "./active-user-repository.interface";
import { ActiveUser } from "./active-user.model";

export class InMemoryActiveUserRepository implements IActiveUserRepository {
	private readonly activeUsers: ActiveUser[] = [];

	public getWatchCount(username: string): number {
		if (!username) {
			throw new Error("parameter: 'username' was not provided");
		}

		const user = this.getUser(username);
		if (user) {
			return user.watchCount;
		} else {
			return 0;
		}
	}

	public setWatchCount(username: string, watchCount: number): void {
		const user = this.getUser(username);
		if (user) {
			user.watchCount = watchCount;
		} else {
			const newUser = new ActiveUser();
			newUser.username = username;
			newUser.watchCount = watchCount;

			this.activeUsers.push(newUser);
		}
	}

	private getUser(username: string): ActiveUser {
		const foundUsers: ActiveUser[] = this.activeUsers.filter((x) => x.username === username);
		if (foundUsers.length > 1) {
			throw new Error("Found more than 1 user in memory");
		} else if (foundUsers.length === 0) {
			return null;
		} else {
			return foundUsers[0];
		}
	}
}
