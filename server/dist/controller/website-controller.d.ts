import type { NextFunction, Response } from "express";
import type { UserRequest } from "../type/user-request";
export declare class WebsiteController {
    static create(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static find(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static update(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static delete(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static get(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static check(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static checkAll(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static getWebsitesAsc(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static getWebsitesDesc(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static getByResponseTime(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static updateAllDetails(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static updateDetail(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static getHealthyCount(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static getDownWebsites(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
    static pdfReport(req: UserRequest, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=website-controller.d.ts.map