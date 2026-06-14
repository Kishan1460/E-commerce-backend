import express from "express";
import { getAllProducts, getProductsByCategory } from "../controllers/productController.js";
const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     description: Returns a list of all available products in the store.
 *     responses:
 *       200:
 *         description: Successfully retrieved all products.
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
 *                   example: 12
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", getAllProducts);

/**
 * @swagger
 * /products/{category}:
 *   get:
 *     summary: Get products by category
 *     tags: [Products]
 *     description: Returns all products filtered by the specified category (e.g., electronics, fashion, groceries).
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: The product category to filter by
 *         example: electronics
 *     responses:
 *       200:
 *         description: Successfully retrieved products for the category.
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
 *                   example: 5
 *                 category:
 *                   type: string
 *                   example: electronics
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       404:
 *         description: No products found for this category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error.
 */
router.get("/:category", getProductsByCategory);

export default router;
