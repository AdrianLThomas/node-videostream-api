import * as http from "http";
import { IRequest } from "../request.interface";

export class LambdaRequest implements IRequest {
	constructor(public readonly headers: http.IncomingHttpHeaders) {
	}
}
