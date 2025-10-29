import express from "express"
import { authRouter, guestRouter } from "../route/api";
import { errorMiddleware } from "../middleware/error-middleware";
import { limiter } from "./rate-limiter";
import { Cors } from "./cors";

export const web = express();
web.use(express.json());
web.use(Cors);
web.use(limiter);
web.use(guestRouter);
web.use(authRouter);
web.use(errorMiddleware);