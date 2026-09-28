import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z
    .string()
    .default("5000")
    .transform((val) => Number(val))
    .refine((num) => Number.isInteger(num) && num >= 1 && num <= 65535, {
      message: "PORT must be an integer between 1 and 65535",
    }),

  // ── Database (Postgres) ─────────────────────────────
  DATABASE_URL: z
    .string()
    .url("DATABASE_URL must be a valid connection string")
    .refine((v) => v.startsWith("postgres://") || v.startsWith("postgresql://"), {
      message: "DATABASE_URL must start with postgres:// or postgresql://",
    }),

  // Only needed if you run migrations / admin scripts with a different role
  DATABASE_URL_TEST: z.string().url().optional(),

  DB_POOL_MAX: z
    .string()
    .default("20")
    .transform(Number)
    .refine((n) => n >= 1 && n <= 200, { message: "DB_POOL_MAX must be 1–200" }),

  // ── Auth ────────────────────────────────────────────
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_EXPIRES_IN: z.string().default("15m"),
  REFRESH_TOKEN_SECRET: z.string().min(32).optional(),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default("7d"),

  // ── CORS / client ───────────────────────────────────
  CLIENT_URLS: z
    .string()
    .default("")
    .transform((val) =>
      val
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean),
    ),
});

// ---- Parse & fail-fast ----
const result = envSchema.safeParse(process.env);

if (!result.success) {
  // Print every invalid var in a readable format, then exit.
  const issues = result.error.issues
    .map((i) => `  • ${i.path.join(".")}: ${i.message}`)
    .join("\n");
  // eslint-disable-next-line no-console
  console.error(`\n❌ Invalid environment variables:\n${issues}\n`);
  process.exit(1);
}

const parsed = result.data;

// ---- Normalize into your app-facing shape ----
const env = Object.freeze({
  nodeEnv: parsed.NODE_ENV,
  isDev: parsed.NODE_ENV === "development",
  isProd: parsed.NODE_ENV === "production",
  isTest: parsed.NODE_ENV === "test",

  port: parsed.PORT,

  db: Object.freeze({
    url: parsed.NODE_ENV === "test" && parsed.DATABASE_URL_TEST
      ? parsed.DATABASE_URL_TEST
      : parsed.DATABASE_URL,
    poolMax: parsed.DB_POOL_MAX,
    // Toggle SSL by env; most managed PG (Neon, Supabase, RDS) need it in prod
    ssl: parsed.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  }),

  auth: Object.freeze({
    jwtSecret: parsed.JWT_SECRET,
    jwtExpiresIn: parsed.JWT_EXPIRES_IN,
    refreshSecret: parsed.REFRESH_TOKEN_SECRET ?? parsed.JWT_SECRET,
    refreshExpiresIn: parsed.REFRESH_TOKEN_EXPIRES_IN,
  }),

  clientUrls: parsed.CLIENT_URLS, // used in cors() in app.js
});

export default env;