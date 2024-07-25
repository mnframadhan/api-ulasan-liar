import { z, ZodType } from "zod";

export class ReviewValidation {
    static readonly CREATE_REVIEW : ZodType = z.object({
        reviewer_name: z.string().min(4).max(20),
        review: z.string().min(5).max(500),
        score: z.number().min(1).max(10)
    })
}