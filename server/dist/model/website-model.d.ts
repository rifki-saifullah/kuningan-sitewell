import type { Website } from "../../generated/prisma";
export type CreateWebsiteRequest = {
    name: string;
    description: string;
    url: string;
};
export type UpdateWebsiteRequest = {
    name: string;
    description: string;
    url: string;
};
export type WebsiteDetail = {
    is_healthy: boolean;
    response_time: number;
    status_code: number;
    message: string;
};
export type WebsiteResponse = {
    id: number;
    name: string;
    description: string;
    url: string;
    is_healthy: boolean;
    response_time: number;
    status_code: number;
    message: string;
    created_at: Date;
    updated_at: Date;
};
export type HealthyCountDetail = {
    total: number;
    percent: number;
};
export type HealthyCountResponse = {
    healthy_websites: HealthyCountDetail;
    down_websites: HealthyCountDetail;
    total_website: number;
};
export type WebsiteReponseTimeDetail = {
    count: number;
    average: number;
};
export type WebsiteReponseTime = {
    good: WebsiteReponseTimeDetail;
    fair: WebsiteReponseTimeDetail;
    poor: WebsiteReponseTimeDetail;
};
export type PdfReportData = {
    responseStats: WebsiteReponseTime;
    healthyCount: HealthyCountResponse;
    bestSites: Website[];
    worstSites: Website[];
    downSites: Website[];
};
export declare function toWebsiteResponse(website: Website): WebsiteResponse;
//# sourceMappingURL=website-model.d.ts.map