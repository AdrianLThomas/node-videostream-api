import * as http from "http";
import * as url from "url";

import { VideoController } from "./controllers/video.controller";
import { AuthorisationService } from "./services/authorisation.service";

const authService = new AuthorisationService();
const videoController = new VideoController();
http.createServer((req, res) => {
		if (!isAuthorised(req, res)) {
			return;
		}

		const urlParts = url.parse(req.url);
		switch (urlParts.pathname) {
			case "/videos/start":
				videoController.startVideo(req, res);
				break;
			default:
				invalidRoute(req, res);
				break;
		}
	})
	.listen(3000);

function invalidRoute(req, res): void {
	res.writeHead(404);
	res.end();
}

function isAuthorised(req, res): boolean {
	if (authService.isAuthorised(req.headers.authorization)) {
		res.writeHead(200);
		return true;
	}

	res.writeHead(401);
	return false;
}

console.log("server running on port 3000");
