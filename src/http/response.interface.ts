import * as http from "http";

export interface IResponse {
	writeHead(statusCode: number, headers?: http.OutgoingHttpHeaders): void;
	end(body: string): void;
}
