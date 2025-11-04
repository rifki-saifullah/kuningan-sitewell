import express from "express"
import { AuthController } from "../controller/auth-controller";
import { UserController } from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";
import { WebsiteController } from "../controller/website-controller";
import { CronController } from "../controller/cron-controller";

export const guestRouter = express.Router();
guestRouter.get("/api", (req, res) => { res.status(200).json({ data: "SiteWell Backend" }) });
guestRouter.post("/api/auths/login", AuthController.login);

export const authRouter = express.Router();

// middleware
authRouter.use(authMiddleware);

// user router
authRouter.get("/api/users/current", UserController.findUser);
authRouter.put("/api/users/profile", UserController.updateProfile);
authRouter.put("/api/users/password", UserController.changePassword);

// auth router
authRouter.post("/api/auths/check", AuthController.check);
authRouter.post("/api/auths/refresh", AuthController.refresh);
authRouter.post("/api/auths/logout", AuthController.logout);

// website router
authRouter.post("/api/websites", WebsiteController.create);
authRouter.get("/api/websites", WebsiteController.get);
authRouter.get("/api/websites/asc", WebsiteController.getWebsitesAsc);
authRouter.get("/api/websites/desc", WebsiteController.getWebsitesDesc);
authRouter.post("/api/websites/check", WebsiteController.checkAll);
authRouter.get("/api/websites/response-time", WebsiteController.getByResponseTime);
authRouter.get("/api/websites/healthy-count", WebsiteController.getHealthyCount);
authRouter.get("/api/websites/down", WebsiteController.getDownWebsites);
authRouter.get("/api/websites/report", WebsiteController.pdfReport);
authRouter.put("/api/websites/details", WebsiteController.updateAllDetails);
authRouter.post("/api/websites/:websiteId/check", WebsiteController.check);
authRouter.get("/api/websites/:websiteId", WebsiteController.find);
authRouter.put("/api/websites/:websiteId", WebsiteController.update);
authRouter.delete("/api/websites/:websiteId", WebsiteController.delete);
authRouter.put("/api/websites/:websiteId/details", WebsiteController.updateDetail);
