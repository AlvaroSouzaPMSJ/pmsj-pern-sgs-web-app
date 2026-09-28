import logger from "../../config/logger.js";
import env from "../../config/env.js";

export default function errorHandler(err, req, res, _next) {
  let status = err.status || err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Postgres error codes
  switch (err.code) {
    case "23505":
      status = 409;
      message = "Resource already exists";
      break; // unique_violation
    case "23503":
      status = 409;
      message = "Related resource missing";
      break; // foreign_key_violation
    case "23502":
      status = 400;
      message = "Missing required field";
      break; // not_null_violation
    case "22P02":
      status = 400;
      message = "Invalid input syntax";
      break; // invalid_text_representation
    case "40001":
      status = 409;
      message = "Transaction conflict, retry";
      break;
  }

  if (status >= 500) logger.error({ err, path: req.path }, "request failed");

  res.status(status).json({
    success: false,
    message,
    ...(env.nodeEnv !== "production" && { stack: err.stack }),
  });
}
