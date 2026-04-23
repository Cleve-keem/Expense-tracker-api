import express, { Application } from "express";
import cookieParser from "cookie-parser";

import { limiter } from "./middlewares/limiter.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import authRoutes from "./routes/auth.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";
import transactionRoutes from "./routes/transaction.route.js";
import settingsRoutes from "./routes/settings.route.js";

const expressLoader = () => {
  const app: Application = express();

  // middlewares
  app.use(express.json());
  app.use(cookieParser());

  // routes
  app.get("/health-check", (_, res) => {
    res.status(200).json({ status: "UP", pid: process.pid });
  });

  app.use("/api/v1/auth", limiter, authRoutes);
  app.use("/api/v1/dashboard", dashboardRoutes);
  app.use("/api/v1/transactions", transactionRoutes);
  app.use("/api/v1/me", settingsRoutes);

  app.use(errorHandler);

  return app;
};

export default expressLoader;
