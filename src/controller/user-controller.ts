import { UserAndReviewsResponse, UserResponse } from '../model/user-model'
import { UserService } from '../service/user-service'
import { Context } from 'hono'


export class UserController {
    static async create(ctx: Context) {

        try {

            const body = await ctx.req.parseBody()

            let fileBuffer1: ArrayBuffer;
            let fileBuffer2: ArrayBuffer;
            let ext1: string; 
            let ext2: string;

            const file1 = body['gambar1']
            
            if (file1 instanceof File) {
                fileBuffer1 = await file1.arrayBuffer()
                const filename1 = file1.name
                ext1 = String(filename1.split('.').pop())
            }

            const file2 = body['gambar2']

            if (file2 instanceof File) {
                fileBuffer2 = await file2.arrayBuffer()
                const filename2 = file2.name
                ext2 = String(filename2.split('.').pop())
            }

            const request = { 
                                name: String(body['name']), 
                                jenis: String(body['jenis']),
                                description: String(body['description'])
                            }

            const response: UserResponse = await UserService.create(request, ctx, fileBuffer1!, fileBuffer2!, ext1!, ext2!)

            ctx.status(201);
            return ctx.json(response)
        } catch (err) {
            ctx.status(400)
            return ctx.json({ err })
        }
    }

    static async get(ctx: Context) {
        try {
            const response: UserResponse = await UserService.get(ctx);
            ctx.status(200);
            return ctx.json(response)

        } catch (err) {
            ctx.status(404);
            return ctx.json({ err })
        }
    }

    static async getByUserID(ctx: Context) {
        try{ 
            const params = ctx.req.param('user-id')
            const response : UserResponse = await UserService.getByUserID(ctx, Number(params))

            ctx.status(200);
            return ctx.json(response)
        } catch (err) {
            ctx.status(404);
            return ctx.json({ err })
        }
    }

    static async getByJenis(ctx: Context) {
        try {
            const param = ctx.req.param("jenis")

            const response: UserResponse = await UserService.getByUserJenis(ctx, param);
            ctx.status(200);
            return ctx.json(response)
        } catch (err) {
            ctx.status(404);
            return ctx.json({ err })
        }
    }

    static async getUserAndReviews(ctx: Context) {
        try {
            const params = ctx.req.param('user-id')
            const response : UserAndReviewsResponse = await UserService.getUserAndReviews(ctx, Number(params))
            ctx.status(200);
            return ctx.json(response);
        } catch (err) {
            ctx.status(404);
            return ctx.json({ err })
        }
    }
}