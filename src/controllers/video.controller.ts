export class VideoController {
	public watchCount = 0;

	public startVideo(req, res): void {
		this.watchCount++;
		res.writeHead(200);
		res.end("OK " + this.watchCount);
	}
}
