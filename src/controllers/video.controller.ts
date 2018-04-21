import * as http from "http";
export class VideoController {
	public watchCount = 0;
	public readonly watchLimit = 3;
	private readonly headers: http.OutgoingHttpHeaders;

	constructor() {
		this.headers = {"Content-Type": "text/plain"};
	}

	public startVideo(req: http.ServerRequest, res: http.ServerResponse): void {
		if (this.watchCount < this.watchLimit) {
			this.watchCount++;
			// res.writeHead(200, this.headers);
			// res.end("OK " + this.watchCount);
		}

		// fail
	}
}
