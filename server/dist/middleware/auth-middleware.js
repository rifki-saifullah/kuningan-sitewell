"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const auth_model_1 = require("../model/auth-model");
const auth_service_1 = require("../service/auth-service");
const authMiddleware = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).json({ errors: "Unauthorized" }).end();
    }
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ errors: "Invalid credential" }).end();
    }
    const token = parts[1];
    try {
        const payload = auth_service_1.AuthService.verifyJWT(token);
        const userAuth = (0, auth_model_1.toUserAuth)(payload.id, payload.username, token);
        req.user = userAuth;
        return next();
    }
    catch {
        return res.status(401).json({ errors: "Invalid credential" }).end();
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth-middleware.js.map