require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const logger = require("./config/logger");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // 1. Connect to MongoDB
    logger.info("🔌 Connecting to MongoDB...");
    await connectDB();

    // 2. Start Express server
    app.listen(PORT, () => {
      logger.info(`🚀 Ecommerce Backend server is running on http://localhost:${PORT}`);
      logger.info(`📚 Swagger API Docs available at http://localhost:${PORT}/api-docs`);
      logger.info(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    logger.error(`💥 Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

// Graceful shutdown
process.on("SIGINT", () => {
  logger.info("🛑 Server shutting down gracefully (SIGINT received)...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  logger.info("🛑 Server shutting down gracefully (SIGTERM received)...");
  process.exit(0);
});

process.on("unhandledRejection", (reason) => {
  logger.error(`💥 Unhandled Promise Rejection: ${reason}`);
  process.exit(1);
});

startServer();
