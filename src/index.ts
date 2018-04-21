import * as http from "http";
import * as url from "url";

import { VideoController } from "./controllers/video.controller";
import { AuthorisationMiddleware } from "./middleware/authorisation.middleware";
import { AuthorisationService } from "./services/authorisation.service";

const authMiddleware = new AuthorisationMiddleware(new AuthorisationService());
const videoController = new VideoController();
http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
		if (!this.authMiddleware.isAuthorised) {
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

console.log("server running on port 3000");
