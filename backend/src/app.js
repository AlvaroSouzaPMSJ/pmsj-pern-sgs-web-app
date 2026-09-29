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
import bodySanitize from "./middleware/sanitize/bodySanitize.js";

//--------------
// ROUTES-STARTS
//--------------

// AUTH
import authRoutes from "./features/auth/routes/auth.route.js"

// USER
import { userRoutes } from "./features/users/index.js";

//------------
// ROUTES-ENDS
//------------

const app = express();

// 1. SECURITY MIDDLEWARES
app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (env.clientUrls.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// 2. PARSERS
app.use(express.json());
app.use(cookieParser());

// 3. SANITIZE
app.use(bodySanitize);
app.use(hpp());

// 4. PERFORMANCE
app.use(compression());

// 5. ROUTES
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

// 6. ERROR HANDLER (KEEP IT ALWAYS LAST)
app.use(errorHandler);

export default app;