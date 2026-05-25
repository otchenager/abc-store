import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import { env } from "../config/env";
import { catalogRouter } from "../routes/catalog.routes";
import { ordersRouter } from "../routes/orders.routes";

const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.CLIENT_URL,
      credentials: true,
    })
  );

  app.use(express.json({ limit: "16kb" }));

  app.get("/", (_req, res) => {
    res.json({ name: "abc-store-api", status: "ok" });
  });

  app.use("/api/products", catalogRouter);
  app.use("/api/orders", orderLimiter, ordersRouter);
 
  return app;
}