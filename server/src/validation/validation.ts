import { ZodType } from "zod";

export class Validation {
    static validate<T>(schema: ZodType, data: T): any {
        return schema.parse(data);
    }
}