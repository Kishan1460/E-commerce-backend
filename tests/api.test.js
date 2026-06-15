import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import Product from "../src/models/Product.js";
import Cart from "../src/models/Cart.js";
import Favourite from "../src/models/Favourite.js";



// Use in-memory test DB (set MONGODB_URI to a test cluster in .env.test)
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ecommerce_test");
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

let testProductId;

// Products 
describe("GET /products", () => {
  beforeAll(async () => {
    const product = await Product.create({
      name: "Test Headphones",
      price: 999,
      category: "electronics",
      image: "https://example.com/img.jpg",
      description: "Test product",
      rating: 4.0,
      stock: 10,
    });
    testProductId = product._id.toString();
  });

  it("should return all products with status 200", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.count).toBeGreaterThan(0);
  });

  it("should return products by category", async () => {
    const res = await request(app).get("/products/electronics");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.category).toBe("electronics");
    res.body.data.forEach((p) => expect(p.category).toBe("electronics"));
  });

  it("should return 404 for non-existent category", async () => {
    const res = await request(app).get("/products/nonexistentcategory999");
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

// Cart
describe("Cart API", () => {
  afterAll(async () => {
    await Cart.deleteMany();
  });

  it("POST /api/cart - should add a product to cart", async () => {
    const res = await request(app)
      .post("/api/cart")
      .send({ productId: testProductId });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.productId).toBe(testProductId);
  });

  it("POST /api/cart - should return 400 without productId", async () => {
    const res = await request(app).post("/api/cart").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("POST /api/cart - should return 404 for invalid productId", async () => {
    const res = await request(app)
      .post("/api/cart")
      .send({ productId: "664f000000000000000000ff" });
    expect(res.statusCode).toBe(404);
  });

  it("GET /cart - should return all cart items", async () => {
    const res = await request(app).get("/cart");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

// Favourites
describe("Favourites API", () => {
  afterAll(async () => {
    await Favourite.deleteMany();
  });

  it("POST /api/favorites - should add a product to favourites", async () => {
    const res = await request(app)
      .post("/api/favorites")
      .send({ productId: testProductId });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.productId).toBe(testProductId);
  });

  it("POST /api/favorites - should not duplicate favourites", async () => {
    const res = await request(app)
      .post("/api/favorites")
      .send({ productId: testProductId });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/already in your favourites/i);
  });

  it("POST /api/favorites - should return 400 without productId", async () => {
    const res = await request(app).post("/api/favorites").send({});
    expect(res.statusCode).toBe(400);
  });

  it("GET /favorites - should return all favourites", async () => {
    const res = await request(app).get("/favorites");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

// Health Check
describe("Health Check", () => {
  it("GET / - should return API info", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("GET /unknown - should return 404", async () => {
    const res = await request(app).get("/unknown-route");
    expect(res.statusCode).toBe(404);
  });
});
