import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import emailRouter from "./routes/email.routes.js";
import assetRouter from "./routes/asset.routes.js";
import { MINUTE, rateLimiter } from "./middlewares/rate-limiter.middleware.js";
import {
  CRON_JOB_AUTO_DELETE_TRASH_TIME,
  cronJobForAutoDeletionFromRecycleBinParmanently
} from "./models/fileFolder.model.js";

const app = express();

// ✅ CORS
const allowedOrigin = [
  "http://localhost:5173",
  "https://project-bin.netlify.app"
];

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Routes
app.use("/users", userRouter);
app.use("/email", emailRouter);
app.use("/asset", assetRouter);

// ✅ Test route
app.get("/", rateLimiter(MINUTE, 5), (req, res) => {
  res.send("✅ Backend deployed successfully");
});

// ✅ Local-only cron
if (process.env.NODE_ENV !== "production") {
  console.log("🕒 Cron job enabled in development");
  setInterval(
    cronJobForAutoDeletionFromRecycleBinParmanently,
    CRON_JOB_AUTO_DELETE_TRASH_TIME
  );
}

export default app;
