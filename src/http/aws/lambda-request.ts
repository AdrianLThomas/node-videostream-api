import * as http from "http";
import { IRequest } from "../request.interface";

export class LambdaRequest implements IRequest {
	constructor(private readonly internalHeaders: http.IncomingHttpHeaders) {
	}

	public get headers(): http.IncomingHttpHeaders { return this.internalHeaders; }
}
