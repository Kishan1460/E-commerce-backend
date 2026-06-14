import Product from "../models/Product.js";
import logger from "../config/logger.js";

// GET /products - Return all products
const getAllProducts = async (req, res) => {
  try {
    logger.info("Fetching all products from database...");
    const products = await Product.find().sort({ createdAt: -1 });
    logger.info(`Successfully fetched ${products.length} products.`);
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    logger.error(`Error fetching all products: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error while fetching products." });
  }
};

// GET /products/:category - Return products by category
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    logger.info(`Fetching products for category: "${category}"`);

    const products = await Product.find({ category: category.toLowerCase() }).sort({ createdAt: -1 });

    if (products.length === 0) {
      logger.warn(`No products found for category: "${category}"`);
      return res.status(404).json({
        success: false,
        message: `No products found in category: "${category}"`,
      });
    }

    logger.info(`Found ${products.length} products in category: "${category}"`);
    res.status(200).json({ success: true, count: products.length, category, data: products });
  } catch (error) {
    logger.error(`Error fetching products by category: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error while fetching products by category." });
  }
};

export { getAllProducts, getProductsByCategory };
