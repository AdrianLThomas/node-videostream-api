import * as http from "http";

export interface IRequest {
	headers: http.IncomingHttpHeaders;
}
