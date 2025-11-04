"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = exports.guestRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth-controller");
const user_controller_1 = require("../controller/user-controller");
const auth_middleware_1 = require("../middleware/auth-middleware");
const website_controller_1 = require("../controller/website-controller");
exports.guestRouter = express_1.default.Router();
exports.guestRouter.get("/api", (req, res) => { res.status(200).json({ data: "SiteWell Backend" }); });
exports.guestRouter.post("/api/auths/login", auth_controller_1.AuthController.login);
exports.authRouter = express_1.default.Router();
// middleware
exports.authRouter.use(auth_middleware_1.authMiddleware);
// user router
exports.authRouter.get("/api/users/current", user_controller_1.UserController.findUser);
exports.authRouter.put("/api/users/profile", user_controller_1.UserController.updateProfile);
exports.authRouter.put("/api/users/password", user_controller_1.UserController.changePassword);
// auth router
exports.authRouter.post("/api/auths/check", auth_controller_1.AuthController.check);
exports.authRouter.post("/api/auths/refresh", auth_controller_1.AuthController.refresh);
exports.authRouter.post("/api/auths/logout", auth_controller_1.AuthController.logout);
// website router
exports.authRouter.post("/api/websites", website_controller_1.WebsiteController.create);
exports.authRouter.get("/api/websites", website_controller_1.WebsiteController.get);
exports.authRouter.get("/api/websites/asc", website_controller_1.WebsiteController.getWebsitesAsc);
exports.authRouter.get("/api/websites/desc", website_controller_1.WebsiteController.getWebsitesDesc);
exports.authRouter.post("/api/websites/check", website_controller_1.WebsiteController.checkAll);
exports.authRouter.get("/api/websites/response-time", website_controller_1.WebsiteController.getByResponseTime);
exports.authRouter.get("/api/websites/healthy-count", website_controller_1.WebsiteController.getHealthyCount);
exports.authRouter.get("/api/websites/down", website_controller_1.WebsiteController.getDownWebsites);
exports.authRouter.get("/api/websites/report", website_controller_1.WebsiteController.pdfReport);
exports.authRouter.put("/api/websites/details", website_controller_1.WebsiteController.updateAllDetails);
exports.authRouter.post("/api/websites/:websiteId/check", website_controller_1.WebsiteController.check);
exports.authRouter.get("/api/websites/:websiteId", website_controller_1.WebsiteController.find);
exports.authRouter.put("/api/websites/:websiteId", website_controller_1.WebsiteController.update);
exports.authRouter.delete("/api/websites/:websiteId", website_controller_1.WebsiteController.delete);
exports.authRouter.put("/api/websites/:websiteId/details", website_controller_1.WebsiteController.updateDetail);
//# sourceMappingURL=api.js.map