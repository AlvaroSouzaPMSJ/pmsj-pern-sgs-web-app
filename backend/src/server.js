import app from "./app.js";
import env from "./config/env.js";
import logger from "./config/logger.js";
import { connectDB, closeDB } from "./config/db.js";

let server;

// ── Process-level safety nets ──────────────────────────────
// These catch things that escape Express entirely.

process.on("unhandledRejection", (reason) => {
  logger.fatal({ reason }, "Unhandled Rejection");
  // Give in-flight requests a chance to finish before dying.
  shutdown("unhandledRejection", 1);
});

process.on("uncaughtException", (err) => {
  logger.fatal({ err }, "Uncaught Exception");
  shutdown("uncaughtException", 1);
});

// ── Graceful shutdown ──────────────────────────────────────
let isShuttingDown = false;

async function shutdown(signal, exitCode = 0) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  logger.info({ signal }, "Shutting down...");

  // Force-exit if shutdown hangs (e.g. a stuck DB connection).
  const forceExit = setTimeout(() => {
    logger.error("Forced shutdown after timeout");
    process.exit(1);
  }, 10_000);
  forceExit.unref();

  try {
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
      });
      logger.info("HTTP server closed");
    }

    await closeDB();
    logger.info("Database pool closed");

    clearTimeout(forceExit);
    process.exit(exitCode);
  } catch (err) {
    logger.error({ err }, "Error during shutdown");
    process.exit(1);
  }
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

// ── Bootstrap ──────────────────────────────────────────────
async function startServer() {
  try {
    await connectDB();

    server = app.listen(env.port, () => {
      logger.info(
        `Server listening on port ${env.port} (${env.nodeEnv})`,
      );
    });

    server.on("error", (err) => {
      logger.fatal({ err }, "HTTP server error");
      shutdown("server.error", 1);
    });
  } catch (err) {
    logger.fatal({ err }, "Failed to start server");
    process.exit(1);
  }
}

startServer();