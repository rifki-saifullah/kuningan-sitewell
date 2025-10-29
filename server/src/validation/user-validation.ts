import { z, type ZodType } from "zod";

export class UserValidation {
    static readonly UPDATE_PROFILE: ZodType = z.object({
        username: z.string().min(1).max(256).optional(),
        email: z.string().min(1).max(256).optional(),
    });

    static readonly UPDATE_PASSWORD: ZodType = z.object({
        current_password: z.string().min(1).max(128),
        new_password: z.string().min(8).max(128),
    });
}