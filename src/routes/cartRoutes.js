import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";
const router = express.Router();


/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get all cart items
 *     tags: [Cart]
 *     description: Retrieves all products currently added to the shopping cart.
 *     responses:
 *       200:
 *         description: Successfully retrieved cart items.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CartItem'
 *       500:
 *         description: Server error.
 */
router.get("/", getCart);

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     description: Adds a product to the cart by productId. If the product already exists in the cart, the quantity is incremented.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "664f1a2b3c4d5e6f7a8b9c0d"
 *               quantity:
 *                 type: integer
 *                 default: 1
 *                 example: 1
 *     responses:
 *       201:
 *         description: Product successfully added to cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: '"Wireless Headphones" added to cart!'
 *                 data:
 *                   $ref: '#/components/schemas/CartItem'
 *       400:
 *         description: Missing productId in request body.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Server error.
 */
router.post("/", addToCart);

/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID to remove
 *     responses:
 *       200:
 *         description: Item removed from cart.
 *       404:
 *         description: Cart item not found.
 *       500:
 *         description: Server error.
 */
router.delete("/:id", removeFromCart);

export default router;
