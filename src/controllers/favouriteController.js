import Favourite from "../models/Favourite.js";
import Product from "../models/Product.js";
import logger from "../config/logger.js";
// POST /api/favorites - Add product to favourites
const addToFavourites = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      logger.warn("Add to favourites attempted without productId.");
      return res.status(400).json({ success: false, message: "productId is required." });
    }

    logger.info(`Adding product [${productId}] to favourites...`);

    const product = await Product.findById(productId);
    if (!product) {
      logger.warn(`Product [${productId}] not found.`);
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    // Check for duplicate
    const exists = await Favourite.findOne({ productId });
    if (exists) {
      logger.info(`ℹProduct "${product.name}" is already in favourites.`);
      return res.status(200).json({
        success: true,
        message: `"${product.name}" is already in your favourites!`,
        data: exists,
      });
    }

    const favourite = await Favourite.create({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });

    logger.info(`Product "${product.name}" added to favourites successfully.`);
    res.status(201).json({
      success: true,
      message: `"${product.name}" added to favourites!`,
      data: favourite,
    });
  } catch (error) {
    logger.error(`Error adding to favourites: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error while adding to favourites." });
  }
};

// GET /favorites - Get all favourites
const getFavourites = async (req, res) => {
  try {
    logger.info("Fetching all favourite items...");
    const favourites = await Favourite.find().sort({ addedAt: -1 });
    logger.info(`Fetched ${favourites.length} favourite(s).`);
    res.status(200).json({ success: true, count: favourites.length, data: favourites });
  } catch (error) {
    logger.error(`Error fetching favourites: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error while fetching favourites." });
  }
};

// DELETE /api/favorites/:id - Remove from favourites
const removeFromFavourites = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`Removing favourite [${id}]...`);
    const deleted = await Favourite.findByIdAndDelete(id);
    if (!deleted) {
      logger.warn(`Favourite [${id}] not found.`);
      return res.status(404).json({ success: false, message: "Favourite item not found." });
    }
    logger.info(`Favourite [${id}] removed successfully.`);
    res.status(200).json({ success: true, message: "Item removed from favourites." });
  } catch (error) {
    logger.error(`Error removing from favourites: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error while removing from favourites." });
  }
};

export { addToFavourites, getFavourites, removeFromFavourites };
