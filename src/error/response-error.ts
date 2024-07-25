import { StatusCode } from "hono/utils/http-status";

export class ResponseError extends Error {
    constructor(public status: StatusCode, public message: string) {

        super(message);
        
    }
}