// src/config/logger.js
import pino from "pino";
import env from "./env.js";

const logger = pino({
  level: env.isProd ? "info" : "debug",
  transport: env.isProd
    ? undefined
    : {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss",
          ignore: "pid,hostname",
        },
      },
});

export default logger;