import * as http from "http";
import { IActiveUserRepository } from "../repositories/active-user-repository.interface";

export class VideoController {
	private readonly watchLimit = 3;
	private readonly headers: http.OutgoingHttpHeaders;

	constructor(private readonly userRepository: IActiveUserRepository) {
		this.headers = {"Content-Type": "text/plain"};
	}

	public startVideo(req: http.ServerRequest, res: http.ServerResponse): void {
		const username = this.getUsername(req, res);
		const watchCount = this.userRepository.getWatchCount(username);

		if (watchCount < this.watchLimit) {
			this.userRepository.setWatchCount(username, watchCount + 1);
			res.writeHead(200, this.headers);
		} else {
			res.writeHead(403, this.headers);
		}

		res.end(this.userRepository.getWatchCount(username).toString());
	}

	public endVideo(req: http.ServerRequest, res: http.ServerResponse): void {
		const username = this.getUsername(req, res);
		const watchCount = this.userRepository.getWatchCount(username);

		if (watchCount > 0) {
			this.userRepository.setWatchCount(username, watchCount - 1);
			res.writeHead(200, this.headers);
		} else {
			res.writeHead(403, this.headers);
		}

		res.end(this.userRepository.getWatchCount(username).toString());
	}

	public count(req: http.ServerRequest, res: http.ServerResponse): void {
		const username = this.getUsername(req, res);

		res.writeHead(200, this.headers);
		res.end(this.userRepository.getWatchCount(username).toString());
	}

	private getUsername(req, res): string {
		return req.headers["x-username"];
	}
}
