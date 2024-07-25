import { Context} from "hono";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";

export const errorMiddleware = async (err: Error, ctx: Context) => {
    if (err instanceof ZodError) {
        ctx.status(400)
        return ctx.json({
            errors: `Validation error, Bad Request: ${JSON.stringify(err)}`
        })

    } else if (err instanceof ResponseError) {
        ctx.status(err.status)
        return ctx.json({
            errors: err.message
        })
    }
}