// src/config/logger.js
import winston from "winston";
import env from "./env.js";

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const devFormat = combine(
  colorize(),
  timestamp({ format: "HH:mm:ss" }),
  errors({ stack: true }),
  printf(({ level, message, timestamp, stack, ...meta }) => {
    const extra = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
    return `${timestamp} [${level}]: ${stack || message}${extra}`;
  })
);

const prodFormat = combine(timestamp(), errors({ stack: true }), json());

const logger = winston.createLogger({
  level: env.isProd ? "info" : "debug",
  format: env.isProd ? prodFormat : devFormat,
  transports: [new winston.transports.Console()],
  exitOnError: false,
});

export default logger;