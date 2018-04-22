import * as http from "http";
import { IRequest } from "../http/request.interface";
import { IResponse } from "../http/response.interface";
import { IActiveUserRepository } from "../repositories/active-user-repository.interface";

export class VideoController {
	private readonly watchLimit = 3;
	private readonly headers: http.OutgoingHttpHeaders;

	constructor(private readonly userRepository: IActiveUserRepository) {
		this.headers = {"Content-Type": "text/plain"};
	}

	public async startVideoAsync(req: IRequest, res: IResponse): Promise<void> {
		const username = this.getUsername(req, res);
		const watchCount = await this.userRepository.getWatchCountAsync(username);

		if (watchCount < this.watchLimit) {
			await this.userRepository.setWatchCountAsync(username, watchCount + 1);
			res.writeHead(200, this.headers);
		} else {
			res.writeHead(403, this.headers);
		}

		res.end((await this.userRepository.getWatchCountAsync(username)).toString());
	}

	public async endVideoAsync(req: IRequest, res: IResponse): Promise<void> {
		const username = this.getUsername(req, res);
		const watchCount = await this.userRepository.getWatchCountAsync(username);

		if (watchCount > 0) {
			await this.userRepository.setWatchCountAsync(username, watchCount - 1);
			res.writeHead(200, this.headers);
		} else {
			res.writeHead(403, this.headers);
		}

		await res.end((await this.userRepository.getWatchCountAsync(username)).toString());
	}

	public async countAsync(req: IRequest, res: IResponse): Promise<void> {
		const username = this.getUsername(req, res);

		res.writeHead(200, this.headers);
		res.end((await this.userRepository.getWatchCountAsync(username)).toString());
	}

	private getUsername(req, res): string {
		return req.headers["x-username"];
	}
}
