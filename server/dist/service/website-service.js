"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsiteService = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const axios_1 = require("../application/axios");
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const website_model_1 = require("../model/website-model");
const util_1 = require("../util/util");
const validation_1 = require("../validation/validation");
const website_validation_1 = require("../validation/website-validation");
const axios_2 = require("axios");
class WebsiteService {
    static async checkMustExists(id) {
        const website = await database_1.prismaClient.website.findUnique({ where: { id } });
        if (!website)
            throw new response_error_1.ResponseError(404, 'Website not found');
        return website;
    }
    static async create(request) {
        const requestValidated = validation_1.Validation.validate(website_validation_1.WebsiteValidation.CREATE, request);
        const websiteDetail = await this.check(requestValidated.url);
        const website = await database_1.prismaClient.website.create({
            data: {
                ...requestValidated,
                ...websiteDetail,
            }
        });
        return (0, website_model_1.toWebsiteResponse)(website);
    }
    static async find(id) {
        const website = await this.checkMustExists(id);
        return (0, website_model_1.toWebsiteResponse)(website);
    }
    static async getbyAsc() {
        return await database_1.prismaClient.website.findMany({
            where: {
                is_healthy: true,
            },
            orderBy: {
                response_time: "asc"
            },
            take: 3,
        });
    }
    static async getDownWebsite() {
        return await database_1.prismaClient.website.findMany({
            where: { is_healthy: false },
        });
    }
    static async getbyDesc() {
        return await database_1.prismaClient.website.findMany({
            where: {
                is_healthy: true,
            },
            orderBy: {
                response_time: "desc"
            },
            take: 3,
        });
    }
    static async getHealthyCount() {
        const total = await database_1.prismaClient.website.count();
        const healthyCount = await database_1.prismaClient.website.count({ where: { is_healthy: true } });
        const downCount = total - healthyCount;
        return {
            healthy_websites: {
                total: healthyCount,
                percent: total === 0 ? 0 : Math.round((healthyCount / total) * 100),
            },
            down_websites: {
                total: downCount,
                percent: total === 0 ? 0 : Math.round((downCount / total) * 100),
            },
            total_website: total,
        };
    }
    static async getByResponseTime() {
        const [good, fair, poor] = await Promise.all([
            database_1.prismaClient.website.aggregate({
                _count: true,
                _avg: { response_time: true },
                where: {
                    is_healthy: true,
                    response_time: { lte: 1000 },
                },
            }),
            database_1.prismaClient.website.aggregate({
                _count: true,
                _avg: { response_time: true },
                where: {
                    is_healthy: true,
                    response_time: { lte: 3000, gt: 1000 },
                },
            }),
            database_1.prismaClient.website.aggregate({
                _count: true,
                _avg: { response_time: true },
                where: {
                    is_healthy: true,
                    response_time: { gt: 3000 },
                },
            }),
        ]);
        return {
            good: {
                count: good._count,
                average: Math.round(good._avg.response_time || 0),
            },
            fair: {
                count: fair._count,
                average: Math.round(fair._avg.response_time || 0),
            },
            poor: {
                count: poor._count,
                average: Math.round(poor._avg.response_time || 0),
            },
        };
    }
    static async update(id, request) {
        const requestValidated = validation_1.Validation.validate(website_validation_1.WebsiteValidation.UPDATE, request);
        const website = await database_1.prismaClient.website.update({
            where: { id },
            data: requestValidated
        });
        if (!website)
            throw new response_error_1.ResponseError(404, 'Website not found');
        return (0, website_model_1.toWebsiteResponse)(website);
    }
    static async delete(id) {
        const website = await database_1.prismaClient.website.delete({ where: { id } });
        if (!website)
            throw new response_error_1.ResponseError(404, 'Website not found');
    }
    static async get(paging) {
        const { page, size } = paging;
        const skip = (page - 1) * size;
        const take = size;
        const [websites, total] = await Promise.all([
            database_1.prismaClient.website.findMany({
                skip,
                take,
                orderBy: { created_at: "desc" },
            }),
            database_1.prismaClient.website.count(),
        ]);
        return {
            data: websites.map(website_model_1.toWebsiteResponse),
            meta: {
                total,
                page,
                size,
                total_pages: Math.ceil(total / size),
            }
        };
    }
    static async check(url) {
        const start = Date.now();
        try {
            const response = await axios_1.axios.head(url);
            const end = Date.now();
            const responseTime = end - start;
            return {
                is_healthy: response.status >= 200 && response.status < 400,
                response_time: responseTime,
                status_code: response.status,
                message: (0, util_1.categorizeResponseTime)(responseTime, response.status),
            };
        }
        catch (err) {
            const end = Date.now();
            const responseTime = end - start;
            let statusCode = null;
            let message = 'Website tidak bisa diakses';
            if ((0, axios_2.isAxiosError)(err)) {
                const axiosErr = err;
                if (axiosErr.response) {
                    statusCode = axiosErr.response.status;
                    message = `Server error ${statusCode}`;
                }
                else if (axiosErr.code === 'ENOTFOUND') {
                    message = 'DNS tidak ditemukan';
                }
                else if (axiosErr.code === 'ECONNREFUSED') {
                    message = 'Koneksi ditolak';
                }
                else if (axiosErr.code === 'ETIMEDOUT') {
                    message = 'Timeout koneksi';
                }
                else {
                    message = axiosErr.message;
                }
            }
            else if (err instanceof Error) {
                message = err.message;
            }
            return {
                is_healthy: false,
                response_time: responseTime,
                status_code: statusCode || 500,
                message,
            };
        }
    }
    static async updateDetail(id) {
        const website = await this.checkMustExists(id);
        const websiteDetail = await this.check(website.url);
        const updatedWebsite = await database_1.prismaClient.website.update({
            where: { id },
            data: { ...websiteDetail },
        });
        return (0, website_model_1.toWebsiteResponse)(updatedWebsite);
    }
    static async updateDetailAll() {
        const websites = await database_1.prismaClient.website.findMany();
        await Promise.all(websites.map(async (website) => {
            const websiteDetail = await this.check(website.url);
            await database_1.prismaClient.website.update({
                where: { id: website.id },
                data: { ...websiteDetail },
            });
        }));
    }
    static async getDownWebsites() {
        return await database_1.prismaClient.website.findMany({
            where: { is_healthy: false },
        });
    }
    static async generatePdfReportFromData() {
        const [responseStats, healthyCount, bestSites, worstSites, downSites] = await Promise.all([
            this.getByResponseTime(),
            this.getHealthyCount(),
            this.getbyAsc(),
            this.getbyDesc(),
            this.getDownWebsites(),
        ]);
        const data = {
            responseStats: responseStats,
            healthyCount: healthyCount,
            bestSites: bestSites,
            worstSites: worstSites,
            downSites: downSites,
        };
        const pdf = new pdfkit_1.default({ margin: 40, size: "A4" });
        (0, util_1.renderHeader)(pdf);
        (0, util_1.renderResponseStats)(pdf, data.responseStats);
        (0, util_1.renderWebsiteHealth)(pdf, data.healthyCount);
        (0, util_1.renderWebsiteList)(pdf, "Website dengan Respon Terbaik", data.bestSites, "response_time", "ms");
        (0, util_1.renderWebsiteList)(pdf, "Website dengan Respon Terburuk", data.worstSites, "response_time", "ms");
        (0, util_1.renderWebsiteList)(pdf, "Website yang Sedang Down", data.downSites, "status_code", "");
        (0, util_1.renderFooter)(pdf);
        pdf.end();
        return pdf;
    }
}
exports.WebsiteService = WebsiteService;
//# sourceMappingURL=website-service.js.map