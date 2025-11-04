import { Website } from "../../generated/prisma";
import { HealthyCountResponse, WebsiteReponseTime, WebsiteResponse } from "../model/website-model";
export declare const categorizeResponseTime: (responseTime: number, responseStatus: number) => string;
export declare function notificationTemplate(downWebsites: WebsiteResponse[]): string;
export declare function renderHeader(pdf: PDFKit.PDFDocument): void;
export declare function renderResponseStats(pdf: PDFKit.PDFDocument, stats: WebsiteReponseTime): void;
export declare function renderWebsiteHealth(pdf: PDFKit.PDFDocument, healthy: HealthyCountResponse): void;
export declare function renderWebsiteList(pdf: PDFKit.PDFDocument, title: string, list: Website[], key: string, suffix: string): void;
export declare function renderFooter(pdf: PDFKit.PDFDocument): void;
export declare function drawLine(pdf: PDFKit.PDFDocument): void;
export declare function drawTable(pdf: PDFKit.PDFDocument, rows: (string | number)[][]): void;
export declare function drawList(pdf: PDFKit.PDFDocument, list: any[], key: string, suffix: string): void;
//# sourceMappingURL=util.d.ts.map