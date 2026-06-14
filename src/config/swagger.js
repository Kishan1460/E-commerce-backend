import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce Website API",
      version: "1.0.0",
      description:
        "Complete REST API documentation for the Ecommerce Website backend. Supports products, cart, and favourites management.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "https://your-app.render.com",
        description: "Production server",
      },
    ],
    tags: [
      { name: "Products", description: "Product listing and category filtering" },
      { name: "Cart", description: "Shopping cart operations" },
      { name: "Favourites", description: "User favourites management" },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            _id: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0d" },
            name: { type: "string", example: "Wireless Headphones" },
            price: { type: "number", example: 2499 },
            category: { type: "string", example: "electronics" },
            image: { type: "string", example: "https://example.com/img.jpg" },
            description: { type: "string", example: "Premium noise-cancelling headphones" },
            rating: { type: "number", example: 4.5 },
            stock: { type: "number", example: 50 },
          },
        },
        CartItem: {
          type: "object",
          properties: {
            _id: { type: "string" },
            productId: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0d" },
            name: { type: "string", example: "Wireless Headphones" },
            price: { type: "number", example: 2499 },
            image: { type: "string" },
            category: { type: "string" },
            quantity: { type: "number", example: 1 },
            addedAt: { type: "string", format: "date-time" },
          },
        },
        FavouriteItem: {
          type: "object",
          properties: {
            _id: { type: "string" },
            productId: { type: "string", example: "664f1a2b3c4d5e6f7a8b9c0d" },
            name: { type: "string", example: "Wireless Headphones" },
            price: { type: "number", example: 2499 },
            image: { type: "string" },
            category: { type: "string" },
            addedAt: { type: "string", format: "date-time" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Something went wrong" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

export default swaggerJsdoc(options);
