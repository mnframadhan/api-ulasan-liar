import { z, ZodType } from "zod";

export class UserValidation {
    static readonly REGISTER : ZodType = z.object({
        name: z.string().min(3).max(100),
        jenis: z.string().min(3).max(100),
        description: z.string().min(3).max(300),
        gmaps_url:  z.string().min(3).optional()
    })
}