import { Callback, Context, Handler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { VideoController } from "./controllers/video.controller";
import { LambdaRequest } from "./http/aws/lambda-request";
import { LambdaResponse } from "./http/aws/lambda-response";
import { AuthorisationMiddleware } from "./middleware/authorisation.middleware";
import { DynamoDbActiveUserRepository } from "./repositories/dynamodb-active-user.repository";
import { AuthorisationService } from "./services/authorisation.service";

const handler: Handler = async (event: any, context: Context, callback: Callback) => {
	if (!event.headers) {
		throw new Error("No headers received: expected to be invoked by API gateway.");
	}

	const activeUserRepository = new DynamoDbActiveUserRepository(process.env.TABLE_NAME);
	const videoController = new VideoController(activeUserRepository);
	const authMiddleware = new AuthorisationMiddleware(new AuthorisationService());
	const req = new LambdaRequest(event.headers);
	const res = new LambdaResponse(callback);

	if (authMiddleware.isAuthorised(req, res)) {
		switch (event.path) {
			case "/startVideo":
				await videoController.startVideoAsync(req, res);
				break;
			case "/endVideo":
				await videoController.endVideoAsync(req, res);
				break;
			case "/count":
				await videoController.countAsync(req, res);
				break;
			default:
				res.writeHead(404);
				res.end("Endpoint not found");
				break;
		}
	}
};

export { handler };
