import { Bindings } from "../bindings";
import { Context } from "hono";
import { CreateUserRequest, UserAndReviewsResponse, UserResponse } from "../model/user-model";
import { Validation } from "../validation/validation";
import { UserValidation } from "../validation/user-validation";
import { ResponseError } from "../error/response-error";
import { v4 as uuidv4} from "uuid"

export class UserService {
    static async create(
        request: CreateUserRequest, 
        ctx: Context<{Bindings: Bindings}>,
        fileBuffer1: ArrayBuffer,
        fileBuffer2: ArrayBuffer,
        ext1: string,
        ext2: string
    ): Promise<UserResponse>{

        // validation
        const validUserRequest : CreateUserRequest = Validation.validate(UserValidation.REGISTER, request);

        if (!validUserRequest) {
            throw new ResponseError(400, "Bad Request")
        }

        // gambar
        const key1 = uuidv4()
        const gambar1 = `${key1}.${ext1}`
        const path1 = `images/${gambar1}`
        
        
        const key2 = uuidv4()
        const gambar2 = `${key2}.${ext2}`
        const path2 = `images/${gambar2}`

        // insert gambar into bucket
        await ctx.env.BUCKET.put(path1, fileBuffer1)
        await ctx.env.BUCKET.put(path2, fileBuffer2)

        
        const created_at = String(Date.now());
        const query = `insert into user (name, created_at, jenis, description, gambar1, gambar2, nreview) values ('${validUserRequest.name}', '${created_at}', '${validUserRequest.jenis}', '${validUserRequest.description}', '${gambar1}', '${gambar2}', 0)`
        // insert into database
        await ctx.env.DB.prepare(query).run();

        const response : UserResponse =  {
            ...validUserRequest,
            gambar1: gambar1,
            gambar2: gambar2,
            created_at: created_at,
            nreview: 0
           }

        return response
    }

    static async get(ctx: Context<{Bindings: Bindings}>): Promise<UserResponse>{

        const query  = `select * from user where verified = true`

        // get from database
        const users = await ctx.env.DB.prepare(query).all()
        const str_users = JSON.stringify(users.results)

        const results : UserResponse = JSON.parse(str_users)

        return results
    }

    static async getByUserID(ctx: Context<{Bindings: Bindings}>, user_id: number): Promise<UserResponse> {
        const query = `select * from user where id=${user_id}`

        
        const user = await ctx.env.DB.prepare(query).all()

        const str_user = JSON.stringify(user.results)
        if (!user || str_user === '[]') {
            throw new ResponseError(404, "User not found")
        }
        const result : UserResponse = JSON.parse(str_user)

        return result
    }

    static async getByUserJenis(ctx: Context, jenis: String): Promise<UserResponse> {
        const query = `select * from user where jenis='${jenis}'`

        const users = await ctx.env.DB.prepare(query).all()
        
        const str_users = JSON.stringify(users.results)

        if (!users || str_users === '[]') {
            throw new ResponseError(404, "User not found")
        }

        const results: UserResponse = JSON.parse(str_users)

        return results

    }

    static async getUserAndReviews(ctx: Context<{Bindings: Bindings}>, user_id: number) : Promise<UserAndReviewsResponse> {
        
        const userQuery = `select * from user where id=${user_id}`
        const user = (await ctx.env.DB.prepare(userQuery).all()).results;
        const str_user = JSON.stringify(user);

        const reviewsQuery = `select * from review where user_id=${user_id}`
        const reviews = (await ctx.env.DB.prepare(reviewsQuery).all()).results;
        const str_reviews = JSON.stringify(reviews);

        const result : UserAndReviewsResponse = {user: JSON.parse(str_user), reviews: JSON.parse(str_reviews)}
        
        return result
    }

    static async getRating(ctx: Context<{Bindings: Bindings}>, user_id: number) {

        const query = `select AVG(score) as rating from review where user_id=${user_id}`
        const result = await ctx.env.DB.prepare(query).first();
        return result;

    }

    static async getNumberOfReviews(ctx: Context<{Bindings: Bindings}>, user_id: number) {

        const query = `select COUNT(*) as count from review where user_id=${user_id}`
        const result = await ctx.env.DB.prepare(query).first();
        return result;
    }
}