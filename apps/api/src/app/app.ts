import cors from "cors";
import express from "express";
import type { AuthUser } from "@repo/shared";
import { env } from "../config/env.js";

type HealthResponse = {
  status: "ok";
  timestamp: string;
  demoUser: AuthUser | null;
};

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
      credentials: true
    })
  );

  app.use(express.json());

  app.get("/", (_req, res) => {
    res.json({
      name: "abc-store-api",
      status: "ok"
    });
  });

  app.get("/api/health", (_req, res) => {
    const response: HealthResponse = {
      status: "ok",
      timestamp: new Date().toISOString(),
      demoUser: null
    };

    res.json(response);
  });

  return app;
}

