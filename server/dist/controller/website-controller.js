"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsiteController = void 0;
const website_service_1 = require("../service/website-service");
class WebsiteController {
    static async create(req, res, next) {
        try {
            const response = await website_service_1.WebsiteService.create(req.body);
            res.status(201).json({
                data: response,
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async find(req, res, next) {
        try {
            const response = await website_service_1.WebsiteService.find(Number(req.params.websiteId));
            res.status(200).json({
                data: response,
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async update(req, res, next) {
        try {
            const response = await website_service_1.WebsiteService.update(Number(req.params.websiteId), req.body);
            res.status(200).json({
                data: response,
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async delete(req, res, next) {
        try {
            await website_service_1.WebsiteService.delete(Number(req.params.websiteId));
            res.status(200).json({
                data: "OK",
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async get(req, res, next) {
        try {
            const page = req.query.page ? Number(req.query.page) : 1;
            const size = req.query.size ? Number(req.query.size) : 10;
            const response = await website_service_1.WebsiteService.get({ page, size });
            res.status(200).json(response);
        }
        catch (e) {
            next(e);
        }
    }
    static async check(req, res, next) {
        try {
            const response = await website_service_1.WebsiteService.updateDetail(Number(req.params.websiteId));
            res.status(200).json({
                data: response,
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async checkAll(req, res, next) {
        try {
            const response = await website_service_1.WebsiteService.updateDetailAll();
            res.status(200).json({
                data: response,
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async getWebsitesAsc(req, res, next) {
        try {
            const response = await website_service_1.WebsiteService.getbyAsc();
            res.status(200).json({
                data: response,
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async getWebsitesDesc(req, res, next) {
        try {
            const response = await website_service_1.WebsiteService.getbyDesc();
            res.status(200).json({
                data: response,
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async getByResponseTime(req, res, next) {
        try {
            const response = await website_service_1.WebsiteService.getByResponseTime();
            res.status(200).json({
                data: response,
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async updateAllDetails(req, res, next) {
        try {
            const response = await website_service_1.WebsiteService.updateDetailAll();
            res.status(200).json({
                data: response,
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async updateDetail(req, res, next) {
        try {
            const response = await website_service_1.WebsiteService.updateDetail(Number(req.params.websiteId));
            res.status(200).json({
                data: response,
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async getHealthyCount(req, res, next) {
        try {
            const response = await website_service_1.WebsiteService.getHealthyCount();
            res.status(200).json({
                data: response,
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async getDownWebsites(req, res, next) {
        try {
            const response = await website_service_1.WebsiteService.getDownWebsites();
            res.status(200).json({
                data: response,
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async pdfReport(req, res, next) {
        try {
            const pdfDoc = await website_service_1.WebsiteService.generatePdfReportFromData();
            const chunks = [];
            pdfDoc.on("data", (chunk) => chunks.push(chunk));
            pdfDoc.on("end", () => {
                const pdfBuffer = Buffer.concat(chunks);
                res.setHeader("Content-Type", "application/pdf");
                res.setHeader("Content-Disposition", "attachment; filename=laporan-monitoring.pdf");
                res.send(pdfBuffer);
            });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.WebsiteController = WebsiteController;
//# sourceMappingURL=website-controller.js.map