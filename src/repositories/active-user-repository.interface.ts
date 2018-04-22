export interface IActiveUserRepository {
	getWatchCountAsync(username: string): Promise<number>;
	setWatchCountAsync(username: string, watchCount: number): Promise<void>;
}
