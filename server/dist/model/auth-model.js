"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserAuth = toUserAuth;
exports.toJWTPayload = toJWTPayload;
exports.toTokenResponse = toTokenResponse;
function toUserAuth(id, username, token) {
    return {
        id: id,
        username: username,
        token: token,
    };
}
function toJWTPayload(user) {
    return {
        id: user.id,
        username: user.username,
    };
}
function toTokenResponse(token, expires_in, type = "Bearer") {
    return {
        token: token,
        expires_in: expires_in,
        type: type,
    };
}
//# sourceMappingURL=auth-model.js.map