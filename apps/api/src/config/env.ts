import "dotenv/config";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 4000),
  CLIENT_URL: process.env.CLIENT_URL ?? "http://localhost:5173",
  DATABASE_URL: getRequiredEnv("DATABASE_URL"),
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN ?? "",
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID ?? "",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY ?? "",
};

if (env.NODE_ENV === "production" && env.CLIENT_URL === "http://localhost:5173") {
  console.warn("[abc-store] WARNING: CLIENT_URL is not set — CORS will reject all frontend requests in production. Set CLIENT_URL in your environment.");
}
