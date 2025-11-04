import type { Website } from "../../generated/prisma";
import type { PagingRequest, PagingResponse } from "../model/page-model";
import { type CreateWebsiteRequest, type HealthyCountResponse, type UpdateWebsiteRequest, type WebsiteDetail, type WebsiteReponseTime, type WebsiteResponse } from "../model/website-model";
export declare class WebsiteService {
    static checkMustExists(id: number): Promise<Website>;
    static create(request: CreateWebsiteRequest): Promise<WebsiteResponse>;
    static find(id: number): Promise<WebsiteResponse>;
    static getbyAsc(): Promise<WebsiteResponse[]>;
    static getDownWebsite(): Promise<WebsiteResponse[]>;
    static getbyDesc(): Promise<WebsiteResponse[]>;
    static getHealthyCount(): Promise<HealthyCountResponse>;
    static getByResponseTime(): Promise<WebsiteReponseTime>;
    static update(id: number, request: UpdateWebsiteRequest): Promise<WebsiteResponse>;
    static delete(id: number): Promise<void>;
    static get(paging: PagingRequest): Promise<PagingResponse<WebsiteResponse>>;
    static check(url: string): Promise<WebsiteDetail>;
    static updateDetail(id: number): Promise<WebsiteResponse>;
    static updateDetailAll(): Promise<void>;
    static getDownWebsites(): Promise<Website[]>;
    static generatePdfReportFromData(): Promise<PDFKit.PDFDocument>;
}
//# sourceMappingURL=website-service.d.ts.map