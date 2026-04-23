import { Server } from "node:http";

class ProcessSupervisor {
  constructor(
    private server: Server,
    private sequelize: any,
  ) {}

  initialize() {
    ["SIGINT", "SIGTERM"].forEach((signal) =>
      process.on(signal, () => this.shutdown(signal)),
    );
    process.on("uncaughtException", (err) => {
      this.handleCrash("uncaughtException", err);
    });
    process.on("unhandledRejection", (reason) => {
      this.handleCrash("unhandledRejection", reason as Error);
    });
  }

  handleCrash(type: string, err: Error) {
    console.error(`[fatal] ${type}:`, err);
    this.shutdown(type, true);
  }

  async shutdown(signal: string, isCrash = false) {
    console.log(`💻 [system] ${signal} received. Closing up...`);
    // Exit timer
    const forceExit = setTimeout(() => process.exit(1), 5000);
    forceExit.unref();

    try {
      // Stop server listening
      if (this.server.listening) {
        new Promise((resolve) => this.server.close(resolve));
        console.log(`💻 [system] server closed!`);
      }
      // disconnect sequelize
      if (this.sequelize) {
        await this.sequelize.disconnect();
        console.log(`💻 [sequelize] sequelize disconnected successfully!`);
      }

      console.log("💻 [system] Cleanup complete.");
      process.exit(isCrash ? 1 : 0);
    } catch (error: any) {
      process.exit(1);
    }
  }
}

export default ProcessSupervisor;
