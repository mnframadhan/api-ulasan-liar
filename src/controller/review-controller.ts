import { Context } from "hono";
import { CreateReviewRequest, ReviewResponse } from "../model/review-model";
import { ReviewService } from "../service/review-service";

export class ReviewController {
    static async create(ctx: Context) {
        try {
            const param = ctx.req.param("user-id")
            const request : CreateReviewRequest = await ctx.req.json();
            const response : ReviewResponse = await ReviewService.create(request, Number(param), ctx)
            
            ctx.status(201);
            return ctx.json(response)
        } catch (err) {
            ctx.status(400)
            return ctx.json({err})
        }
    }

    static async get(ctx: Context) {
        try {
            
            const param = ctx.req.param('user-id')
            const response : ReviewResponse = await ReviewService.get(Number(param), ctx)

            ctx.status(200);
            return ctx.json(response)

        } catch (err) {
            ctx.status(404)
            return ctx.json({err})

        }
    }

    static async agree(ctx: Context) {
        try {
            const param = ctx.req.param('review-id')
            const response = await ReviewService.agree(Number(param), ctx)
            ctx.status(201);
            return ctx.json(response)
        } catch (err) {
            ctx.status(404)
            return ctx.json({err})
        }
    }

    static async disagree(ctx: Context) {
        try {
            const param = ctx.req.param('review-id')
            const response = await ReviewService.disagree(Number(param), ctx)
            ctx.status(201);
            return ctx.json(response)
        } catch (err) {
            ctx.status(404)
            return ctx.json({err})
        }
    }
}