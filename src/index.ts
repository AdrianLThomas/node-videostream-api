import * as http from "http";
import * as url from "url";

import { VideoController } from "./controllers/video.controller";
import { AuthorisationMiddleware } from "./middleware/authorisation.middleware";
import { InMemoryActiveUserRepository } from "./repositories/inmemory-active-user.repository";
import { AuthorisationService } from "./services/authorisation.service";

const authMiddleware = new AuthorisationMiddleware(new AuthorisationService());
const activeUserRepository = new InMemoryActiveUserRepository();
http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
	const videoController = new VideoController(activeUserRepository);

	if (!authMiddleware.isAuthorised(req, res)) {
		return;
	}

	const urlParts = url.parse(req.url);
	switch (urlParts.pathname) {
		case "/videos/start":
			videoController.startVideo(req, res);
			break;
		case "/videos/end":
			videoController.endVideo(req, res);
			break;
		case "/videos/count":
			videoController.count(req, res);
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
