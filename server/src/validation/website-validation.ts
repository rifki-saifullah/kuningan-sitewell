import { z, type ZodType } from "zod";

export class WebsiteValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(20),
        description: z.string().min(1).max(256),
        url: z.string().min(1).max(128),
    });

    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).max(20),
        description: z.string().min(1).max(256),
        url: z.string().min(1).max(128),
    });
}