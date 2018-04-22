import * as http from "http";
import { IRequest } from "../request.interface";

export class NodeRequest implements IRequest {
	public readonly headers: http.IncomingHttpHeaders;

	constructor(private readonly req: http.IncomingMessage) {
		this.headers = this.req.headers;
	}
}
