const Cart = require("../models/Cart");
const Product = require("../models/Product");
const logger = require("../config/logger");

// POST /api/cart - Add product to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId) {
      logger.warn("Add to cart attempted without productId.");
      return res.status(400).json({ success: false, message: "productId is required." });
    }

    logger.info(`🛒 Adding product [${productId}] to cart...`);

    // Validate the product exists in DB
    const product = await Product.findById(productId);
    if (!product) {
      logger.warn(`Product [${productId}] not found in database.`);
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    // Check if already in cart — if so, increment quantity
    let cartItem = await Cart.findOne({ productId });
    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
      logger.info(`Product [${productId}] already in cart. Updated quantity to ${cartItem.quantity}.`);
      return res.status(200).json({
        success: true,
        message: "Product quantity updated in cart!",
        data: cartItem,
      });
    }

    cartItem = await Cart.create({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: quantity || 1,
    });

    logger.info(`Product "${product.name}" successfully added to cart.`);
    res.status(201).json({
      success: true,
      message: `"${product.name}" added to cart!`,
      data: cartItem,
    });
  } catch (error) {
    logger.error(`Error adding to cart: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error while adding to cart." });
  }
};

// GET /cart - Get all cart items
const getCart = async (req, res) => {
  try {
    logger.info("🛒 Fetching all cart items...");
    const cartItems = await Cart.find().sort({ addedAt: -1 });
    logger.info(`Fetched ${cartItems.length} item(s) from cart.`);
    res.status(200).json({ success: true, count: cartItems.length, data: cartItems });
  } catch (error) {
    logger.error(`Error fetching cart: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error while fetching cart." });
  }
};

// DELETE /api/cart/:id - Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`Removing cart item [${id}]...`);
    const deleted = await Cart.findByIdAndDelete(id);
    if (!deleted) {
      logger.warn(`Cart item [${id}] not found.`);
      return res.status(404).json({ success: false, message: "Cart item not found." });
    }
    logger.info(`Cart item [${id}] removed successfully.`);
    res.status(200).json({ success: true, message: "Item removed from cart." });
  } catch (error) {
    logger.error(`Error removing from cart: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error while removing from cart." });
  }
};

module.exports = { addToCart, getCart, removeFromCart };
