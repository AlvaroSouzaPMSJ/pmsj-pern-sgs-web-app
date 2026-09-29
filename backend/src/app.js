import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import hpp from "hpp";

import env from "./config/env.js";
import logger from "./config/logger.js";
import errorHandler from "./middleware/error/errorHandler.js";
import { userRoutes } from "./features/users/index.js";

const app = express();

// Trust proxy (needed behind nginx / Heroku / Render / etc.)
app.set("trust proxy", 1);

// ── Security ────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (env.clientUrls.includes(origin)) return callback(null, true);
      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// ── Parsers ─────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// ── Sanitize ────────────────────────────────────────────
app.use(hpp());

// ── Performance ─────────────────────────────────────────
app.use(compression());

// ── Health ──────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

// ── Routes ──────────────────────────────────────────────
app.use("/api/users", userRoutes);

// ── 404 ─────────────────────────────────────────────────
app.use((req, _res, next) => {
  const err = new Error(`Not found: ${req.originalUrl}`);
  err.status = 404;
  next(err);
});

// ── Error handler (LAST) ────────────────────────────────
app.use(errorHandler);

export default app;