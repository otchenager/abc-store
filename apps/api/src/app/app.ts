import cors from "cors";
import express from "express";
import { env } from "../config/env.js";
import { catalogRouter } from "../routes/catalog.routes.js";
export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.CLIENT_URL,
      credentials: true,
    })
  );
 
  app.use(express.json());
 
  app.get("/", (_req, res) => {
    res.json({ name: "abc-store-api", status: "ok" });
  });

  app.use("/api/products", catalogRouter);
 
  return app;
}