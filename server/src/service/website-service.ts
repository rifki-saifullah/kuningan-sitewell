import PDFDocument from "pdfkit";
import type { Website } from "../../generated/prisma";
import { axios } from "../application/axios";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import type { PagingRequest, PagingResponse } from "../model/page-model";
import { PdfReportData, toWebsiteResponse, type CreateWebsiteRequest, type HealthyCountResponse, type UpdateWebsiteRequest, type WebsiteDetail, type WebsiteReponseTime, type WebsiteResponse } from "../model/website-model";
import { categorizeResponseTime, renderFooter, renderHeader, renderResponseStats, renderWebsiteHealth, renderWebsiteList } from "../util/util";
import { Validation } from "../validation/validation";
import { WebsiteValidation } from "../validation/website-validation";
import { AxiosError, isAxiosError } from "axios";

export class WebsiteService {
    static async checkMustExists(id: number): Promise<Website> {
        const website = await prismaClient.website.findUnique({ where: { id } });

        if (!website) throw new ResponseError(404, 'Website not found');

        return website;
    }

    static async create(request: CreateWebsiteRequest): Promise<WebsiteResponse> {
        const requestValidated = Validation.validate(WebsiteValidation.CREATE, request);

        const websiteDetail = await this.check(requestValidated.url);

        const website = await prismaClient.website.create({ 
            data: { 
                ...requestValidated,
                ...websiteDetail,
            }
        })

        return toWebsiteResponse(website);
    }

    static async find(id: number): Promise<WebsiteResponse> {
        const website = await this.checkMustExists(id)

        return toWebsiteResponse(website);
    }

    static async getbyAsc(): Promise<WebsiteResponse[]> {
        return await prismaClient.website.findMany({
            where: {
                is_healthy: true,
            },
            orderBy: {
                response_time: "asc"
            },
            take: 3,
        });
    }

    static async getDownWebsite(): Promise<WebsiteResponse[]> {
        return await prismaClient.website.findMany({
            where: { is_healthy: false },
        });
    }

    static async getbyDesc(): Promise<WebsiteResponse[]> {
        return await prismaClient.website.findMany({
            where: {
                is_healthy: true,
            },
            orderBy: {
                response_time: "desc"
            },
            take: 3,
        });
    }

    static async getHealthyCount(): Promise<HealthyCountResponse> {
        const total = await prismaClient.website.count();
        const healthyCount = await prismaClient.website.count({ where: { is_healthy: true }});
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

    static async getByResponseTime(): Promise<WebsiteReponseTime> {
        const [ good, fair, poor ] = await Promise.all([
            prismaClient.website.aggregate({
                _count: true,
                _avg: { response_time: true },
                where: {
                    is_healthy: true,
                    response_time: { lte: 1000 },
                },
            }),
            prismaClient.website.aggregate({
                _count: true,
                _avg: { response_time: true },
                where: {
                    is_healthy: true,
                    response_time: { lte: 3000, gt: 1000 },
                },
            }),
            prismaClient.website.aggregate({
                _count: true,
                _avg: { response_time: true },
                where: {
                    is_healthy: true,
                    response_time: { gt: 3000},
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
        }
    }

    static async update(id: number, request: UpdateWebsiteRequest): Promise<WebsiteResponse> {
        const requestValidated = Validation.validate(WebsiteValidation.UPDATE, request);

        const website = await prismaClient.website.update({
            where: { id },
            data: requestValidated
        });

        if (!website) throw new ResponseError(404, 'Website not found');

        return toWebsiteResponse(website);
    }

    static async delete(id: number): Promise<void> {
        const website = await prismaClient.website.delete({ where: { id } });

        if (!website) throw new ResponseError(404, 'Website not found');
    }

    static async get(paging: PagingRequest): Promise<PagingResponse<WebsiteResponse>> {
        const { page, size } = paging;
        const skip = (page - 1) * size;
        const take = size;

        const [ websites, total ] = await Promise.all([
            prismaClient.website.findMany({
                skip,
                take,
                orderBy: { created_at: "desc" },
            }),
            prismaClient.website.count(),
        ]);

        return {
            data: websites.map(toWebsiteResponse),
            meta: {
               total,
               page,
               size,
               total_pages: Math.ceil(total / size), 
            }
        };
    }

    static async check(url: string): Promise<WebsiteDetail> {
        const start = Date.now();

        try {
            const response = await axios.head(url); 
            const end = Date.now();
            const responseTime = end - start;

            return {
                is_healthy: response.status >= 200 && response.status < 400,
                response_time: responseTime,
                status_code: response.status,
                message: categorizeResponseTime(responseTime, response.status),
            };

        } catch (err) {
            const end = Date.now();
            const responseTime = end - start;

            let statusCode: number | null = null;
            let message = 'Website tidak bisa diakses';

            if (isAxiosError(err)) {
            const axiosErr = err as AxiosError;
            if (axiosErr.response) {
                statusCode = axiosErr.response.status;
                message = `Server error ${statusCode}`;
            } else if (axiosErr.code === 'ENOTFOUND') {
                message = 'DNS tidak ditemukan';
            } else if (axiosErr.code === 'ECONNREFUSED') {
                message = 'Koneksi ditolak';
            } else if (axiosErr.code === 'ETIMEDOUT') {
                message = 'Timeout koneksi';
            } else {
                message = axiosErr.message;
            }
            } else if (err instanceof Error) {
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

    static async updateDetail(id: number): Promise<WebsiteResponse> {
        const website = await this.checkMustExists(id);
        const websiteDetail = await this.check(website.url);

        const updatedWebsite = await prismaClient.website.update({
            where: { id },
            data: { ...websiteDetail },
        });

        return toWebsiteResponse(updatedWebsite);
    }

    static async updateDetailAll(): Promise<void> {
        const websites = await prismaClient.website.findMany();

        await Promise.all(websites.map(async (website) => {
            const websiteDetail = await this.check(website.url);
            await prismaClient.website.update({
                where: { id: website.id },
                data: { ...websiteDetail },
            });
        }));
    }

    static async getDownWebsites(): Promise<Website[]> {
        return await prismaClient.website.findMany({
            where: { is_healthy: false },
        });
    }

    static async generatePdfReportFromData() {
        const [responseStats, healthyCount, bestSites, worstSites, downSites] =
        await Promise.all([
            this.getByResponseTime(),
            this.getHealthyCount(),
            this.getbyAsc(),
            this.getbyDesc(),
            this.getDownWebsites(),
        ]);

        const data: PdfReportData = {
            responseStats: responseStats,
            healthyCount: healthyCount,
            bestSites: bestSites,
            worstSites: worstSites,
            downSites: downSites,
        };

        const pdf = new PDFDocument({ margin: 40, size: "A4" });

        renderHeader(pdf);
        renderResponseStats(pdf, data.responseStats);
        renderWebsiteHealth(pdf, data.healthyCount);
        renderWebsiteList(pdf, "Website dengan Respon Terbaik", data.bestSites, "response_time", "ms");
        renderWebsiteList(pdf, "Website dengan Respon Terburuk", data.worstSites, "response_time", "ms");
        renderWebsiteList(pdf, "Website yang Sedang Down", data.downSites, "status_code", "");
        renderFooter(pdf);
        pdf.end();

        return pdf;
    }
}