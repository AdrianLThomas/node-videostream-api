export interface IActiveUserRepository {
	getWatchCount(username: string): number;
	setWatchCount(username: string, watchCount: number): void;
}
