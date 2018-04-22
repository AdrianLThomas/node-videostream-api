import { Callback, Context, Handler } from "aws-lambda";
import * as http from "http";
import { IResponse } from "../response.interface";

export class LambdaResponse implements IResponse {
	private statusCode: number;
	private headers?: http.OutgoingHttpHeaders;

	constructor(private readonly callback: Callback) {
	}

	public writeHead(statusCode: number, headers?: http.OutgoingHttpHeaders): void {
		this.statusCode = statusCode;
		this.headers = headers;
	}

	public end(returnBody: string): void {
		this.callback(null, {
			body: returnBody,
			headers: this.headers,
			statusCode: this.statusCode,
		});
	}
}
