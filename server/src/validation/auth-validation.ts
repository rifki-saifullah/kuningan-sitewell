import { z, type ZodType } from "zod";

export class AuthValidation {
    static readonly LOGIN: ZodType = z.object({
        email: z.string().min(1).max(256),
        password: z.string().min(1).max(128),
    });
}