import pg from "pg";
import env from "./env.js";
import logger from "./logger.js";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: env.databaseUrl,
  max: 20,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
  // ssl: env.nodeEnv === "production" ? { rejectUnauthorized: false } : false,
});

pool.on("error", (err) => logger.error("Unexpected PG pool error", err));

export async function connectDB() {
  const client = await pool.connect();
  try {
    await client.query("SELECT 1");
    logger.info("PostgreSQL connected");
  } finally {
    client.release();
  }
}

export async function closeDB() {
  await pool.end();
}

export default pool;