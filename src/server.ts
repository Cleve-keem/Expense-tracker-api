import { Application } from "express";
import expressLoader from "./app.js";
import dotenv from "dotenv";
import { Server } from "node:http";
import ProcessSupervisor from "./configs/process-supervisor.js";
import { sequelize } from "./configs/db.config.js";

dotenv.config();

const startServer = async () => {
  const app: Application = expressLoader();
  const PORT = Number(process.env.PORT) || 5001;

  try {
    await sequelize.sync({ alter: false });
    console.log("✅ [sequelize] 📅 Tables have been synced!");

    const server: Server = app.listen(PORT, () =>
      console.log(`🚀 [boot] server listening on port ${PORT}`),
    );

    new ProcessSupervisor(server, sequelize).initialize();
  } catch (error: any) {
    console.log(`⚠ [boot] failed to start application server`, error.message);
    process.exit(1);
  }
};

startServer();
