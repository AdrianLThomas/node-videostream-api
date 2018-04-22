import * as http from "http";
import { IRequest } from "../request.interface";

export class NodeRequest implements IRequest {
	constructor(private readonly req: http.IncomingMessage) {
	}

	public get headers(): http.IncomingHttpHeaders { return this.req.headers; }
}
