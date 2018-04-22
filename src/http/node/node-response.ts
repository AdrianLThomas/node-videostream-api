import * as http from "http";
import { IResponse } from "../response.interface";

export class NodeResponse implements IResponse {
	constructor(private readonly res: http.ServerResponse) {
	}

	public writeHead(statusCode: number, headers?: http.OutgoingHttpHeaders): void {
		this.res.writeHead(statusCode, headers);
	}

	public end(body: string): void {
		this.res.end(body);
	}
}
