import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import env from "./env.js";
import logger from "./logger.js";
import * as schema from "../db/schema.js";

const { Pool } = pg;

// ── Postgres connection pool ───────────────────────────
export const pool = new Pool({
  connectionString: env.db.url,
  max: env.db.poolMax,
  ssl: env.db.ssl,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

pool.on("error", (err) => {
  logger.error({ err }, "Unexpected PG pool error");
});

// ── Drizzle instance (this is the `db` your repo imports) ──
export const db = drizzle(pool, { schema });

// ── Lifecycle helpers used by server.js ────────────────
export async function connectDB() {
  const client = await pool.connect();
  try {
    await client.query("SELECT 1");
    logger.info(`PostgreSQL connected (${env.nodeEnv})`);
  } finally {
    client.release();
  }
}

export async function closeDB() {
  await pool.end();
}

// Optional default export in case any code does `import pool from`
export default pool;