import { Callback, Context, Handler } from "aws-lambda";
import { VideoController } from "./controllers/video.controller";
import { LambdaRequest } from "./http/aws/lambda-request";
import { LambdaResponse } from "./http/aws/lambda-response";
import { AuthorisationMiddleware } from "./middleware/authorisation.middleware";
import { InMemoryActiveUserRepository } from "./repositories/inmemory-active-user.repository";
import { AuthorisationService } from "./services/authorisation.service";

const activeUserRepository = new InMemoryActiveUserRepository();
const videoController = new VideoController(activeUserRepository);
const authMiddleware = new AuthorisationMiddleware(new AuthorisationService());

const handler: Handler = (event: any, context: Context, callback: Callback) => {
	if (!event.headers) {
		throw new Error("No headers received: expected to be invoked by API gateway.");
	}

	const req = new LambdaRequest(event.headers);
	const res = new LambdaResponse(callback);
	if (authMiddleware.isAuthorised(req, res)) {
		switch (event.path) {
			case "/startVideo":
				videoController.startVideo(req, res);
				break;
			case "/endVideo":
				videoController.endVideo(req, res);
				break;
			case "/count":
				videoController.count(req, res);
				break;
			default:
				res.writeHead(404);
				res.end("Endpoint not found");
				break;
		}
	}
};

export { handler };
