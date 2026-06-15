import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import logger from "./config/logger.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import favouriteRoutes from "./routes/favouriteRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP request logging via morgan → winston
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.http(message.trim()) },
  })
);

// API Documentation 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: "Ecommerce API Docs",
  customCss: ".swagger-ui .topbar { background-color: #1a1a2e; }",
}));

// Health Check
app.get("/", (req, res) => {
  logger.info("Health check endpoint hit.");
  res.status(200).json({
    success: true,
    message: "Ecommerce Website API is running!",
    docs: "/api-docs",
    version: "1.0.0",
  });
});

// Products
app.use("/products", productRoutes);

// Cart - GET via /cart, POST/DELETE via /api/cart
app.use("/cart", cartRoutes);
app.use("/api/cart", cartRoutes);

// Favorites - GET via /favorites, POST/DELETE via /api/favorites
app.use("/favorites", favouriteRoutes);
app.use("/api/favorites", favouriteRoutes);

// Error Handling 
app.use(notFound);
app.use(errorHandler);

export default app;
