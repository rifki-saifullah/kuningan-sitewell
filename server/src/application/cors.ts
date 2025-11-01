import cors from "cors";

export const Cors = cors({
  origin: "*",
  credentials: true,
})