"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toWebsiteResponse = toWebsiteResponse;
function toWebsiteResponse(website) {
    return {
        id: website.id,
        name: website.name,
        description: website.description,
        url: website.url,
        is_healthy: website.is_healthy,
        response_time: website.response_time,
        status_code: website.status_code,
        message: website.message,
        created_at: website.created_at,
        updated_at: website.updated_at,
    };
}
;
//# sourceMappingURL=website-model.js.map