import cors from "cors";

export const Cors = cors({
  origin: ["http://localhost:3000", "http://client:3000"],
  credentials: true,
})