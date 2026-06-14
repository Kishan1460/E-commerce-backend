import "dotenv/config";
import mongoose from "mongoose";
import Product from "../src/models/Product.js";
import logger from "../src/config/logger.js";

const products = [
  { name: "Wireless Noise-Cancelling Headphones", price: 2999, category: "electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", description: "Premium over-ear headphones with 30hr battery.", rating: 4.5, stock: 25 },
  { name: "Mechanical Gaming Keyboard", price: 1799, category: "electronics", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400", description: "RGB backlit mechanical keyboard with blue switches.", rating: 4.3, stock: 40 },
  { name: "4K Webcam", price: 3499, category: "electronics", image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=400", description: "Ultra HD webcam for streaming and video calls.", rating: 4.7, stock: 15 },
  { name: "Running Sneakers", price: 1299, category: "fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", description: "Lightweight breathable running shoes.", rating: 4.2, stock: 60 },
  { name: "Men's Slim Fit T-Shirt", price: 499, category: "fashion", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", description: "100% cotton casual slim-fit tee.", rating: 4.0, stock: 100 },
  { name: "Leather Wallet", price: 799, category: "fashion", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", description: "Genuine leather bifold wallet.", rating: 4.6, stock: 75 },
  { name: "Organic Green Tea (100g)", price: 299, category: "groceries", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400", description: "Pure organic Darjeeling green tea.", rating: 4.8, stock: 200 },
  { name: "Cold Pressed Coconut Oil (500ml)", price: 449, category: "groceries", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400", description: "100% pure cold-pressed coconut oil.", rating: 4.5, stock: 150 },
  { name: "The Psychology of Money", price: 349, category: "books", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400", description: "Bestselling book on wealth and mindset.", rating: 4.9, stock: 80 },
  { name: "Atomic Habits", price: 399, category: "books", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400", description: "Build good habits and break bad ones.", rating: 4.9, stock: 90 },
  { name: "Yoga Mat (6mm)", price: 999, category: "sports", image: "https://images.unsplash.com/photo-1601925228522-9b08bebe6eda?w=400", description: "Non-slip eco-friendly yoga mat.", rating: 4.4, stock: 45 },
  { name: "Resistance Bands Set", price: 699, category: "sports", image: "https://images.unsplash.com/photo-1598632640487-6ea4a4e8b963?w=400", description: "5-piece set with varying resistance levels.", rating: 4.3, stock: 55 },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info("✅ Connected to MongoDB for seeding.");

    await Product.deleteMany();
    logger.info("🗑️  Cleared existing products.");

    await Product.insertMany(products);
    logger.info(`🌱 Successfully seeded ${products.length} products.`);

    process.exit(0);
  } catch (err) {
    logger.error(`❌ Seeding failed: ${err.message}`);
    process.exit(1);
  }
};

seedDB();
