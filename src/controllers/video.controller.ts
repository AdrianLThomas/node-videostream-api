import * as http from "http";
export class VideoController {
	private readonly watchLimit = 3;
	private readonly headers: http.OutgoingHttpHeaders;
	private watchCount = 0;

	constructor() {
		this.headers = {"Content-Type": "text/plain"};
	}

	public startVideo(req: http.ServerRequest, res: http.ServerResponse): void {
		if (this.watchCount < this.watchLimit) {
			this.watchCount++;
			res.writeHead(200, this.headers);
		} else {
			res.writeHead(403, this.headers);
		}

		res.end(this.watchCount.toString());
	}

	public endVideo(req: http.ServerRequest, res: http.ServerResponse): void {
		if (this.watchCount > 0) {
			this.watchCount--;
			res.writeHead(200, this.headers);
		} else {
			res.writeHead(403, this.headers);
		}

		res.end(this.watchCount.toString());
	}

	public count(req: http.ServerRequest, res: http.ServerResponse): void {
		res.writeHead(200, this.headers);
		res.end(this.watchCount.toString());
	}
}
