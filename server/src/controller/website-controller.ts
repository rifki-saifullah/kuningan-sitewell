import type { NextFunction, Response } from "express";
import type { UserRequest } from "../type/user-request";
import { WebsiteService } from "../service/website-service";

export class WebsiteController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await WebsiteService.create(req.body);
            res.status(201).json({
                data: response,
            });
        } catch (e) {
            next(e);
        }
    }

    static async find(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await WebsiteService.find(Number(req.params.websiteId));
            res.status(200).json({
                data: response,
            });
        } catch (e) {
            next(e);
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await WebsiteService.update(Number(req.params.websiteId), req.body);
            res.status(200).json({
                data: response,
            });
        } catch (e) {
            next(e);
        }
    }

    static async delete(req: UserRequest, res: Response, next: NextFunction) {
        try {
            await WebsiteService.delete(Number(req.params.websiteId));
            res.status(200).json({
                data: "OK",
            });
        } catch (e) {
            next(e);
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const page = req.query.page ? Number(req.query.page) : 1;
            const size = req.query.size ? Number(req.query.size) : 10;

            const response = await WebsiteService.get({ page, size });
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    static async check(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await WebsiteService.updateDetail(Number(req.params.websiteId));
            res.status(200).json({
                data: response,
            });
        } catch (e) {
            next(e);
        }
    }

    static async checkAll(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await WebsiteService.updateDetailAll();
            res.status(200).json({
                data: response,
            });
        } catch (e) {
            next(e);
        }
    }

    static async getWebsitesAsc(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await WebsiteService.getbyAsc();
            res.status(200).json({
                data: response,
            });
        } catch (e) {
            next(e);
        }
    }

    static async getWebsitesDesc(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await WebsiteService.getbyDesc();
            res.status(200).json({
                data: response,
            });
        } catch (e) {
            next(e);
        }
    }

    static async getByResponseTime(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await WebsiteService.getByResponseTime();
            res.status(200).json({
                data: response,
            });
        } catch (e) {
            next(e);
        }
    }

    static async updateAllDetails(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await WebsiteService.updateDetailAll();
            res.status(200).json({
                data: response,
            });
        } catch (e) {
            next(e);
        }
    }

    static async updateDetail(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await WebsiteService.updateDetail(Number(req.params.websiteId));
            res.status(200).json({
                data: response,
            });
        } catch (e) {
            next(e);
        }
    }

    static async getHealthyCount(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await WebsiteService.getHealthyCount();
            res.status(200).json({
                data: response,
            });
        } catch (e) {
            next(e);
        }
    }

    static async getDownWebsites(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await WebsiteService.getDownWebsites();
            res.status(200).json({
                data: response,
            });
        } catch (e) {
            next(e);
        }
    }

    static async pdfReport(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const pdfDoc = await WebsiteService.generatePdfReportFromData()

            const chunks: Buffer[] = []
            pdfDoc.on("data", (chunk) => chunks.push(chunk))
            pdfDoc.on("end", () => {
            const pdfBuffer = Buffer.concat(chunks)

            res.setHeader("Content-Type", "application/pdf")
            res.setHeader("Content-Disposition", "attachment; filename=laporan-monitoring.pdf")
            res.send(pdfBuffer)
            })
        } catch (e) {
            next(e);
        }
    }
}