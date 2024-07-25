import { Context } from "hono";
import { CreateReviewRequest, ReviewResponse } from "../model/review-model";
import { ReviewValidation } from "../validation/review-validation";
import { Validation } from "../validation/validation";

export class ReviewService {
    static async create(request: CreateReviewRequest, user_id: number, ctx: Context): Promise<ReviewResponse> {
        // validation
        const validReviewRequest : CreateReviewRequest = Validation.validate(ReviewValidation.CREATE_REVIEW, request)

        if (!validReviewRequest) {
            throw new Error("Bad Request")
        }

        const created_at = String(Date.now());

        // insert into database
        const query = `insert into review (user_id, reviewer_name, review, score, created_at) values ('${user_id}', '${validReviewRequest.reviewer_name}', '${validReviewRequest.review}', '${validReviewRequest.score}', '${created_at}')`
        // insert into database
        await ctx.env.DB.prepare(query).run();

        const response : ReviewResponse =  {user_id: user_id, ...validReviewRequest}

        return response
    }

    static async get(user_id: number, ctx: Context): Promise<ReviewResponse> {

        // select from database
        const query = `select * from review where user_id = '${user_id}'`
        const response = await ctx.env.DB.prepare(query).all();
        
        return response

    }

    static async agree (review_id: number, ctx: Context) {

        // alter table
        const agree_query = `update review set agree = agree + 1 where id = ${review_id}`
        const response = await ctx.env.DB.prepare(agree_query).run();

        return response
    }

    static async disagree   (review_id: number, ctx: Context) {

        // alter table
        const agree_query = `update review set disagree = disagree + 1 where id = ${review_id}`
        const response = await ctx.env.DB.prepare(agree_query).run();

        return response
    }
}