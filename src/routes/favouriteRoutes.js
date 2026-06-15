import express from "express";
import { addToFavourites, getFavourites, removeFromFavourites } from "../controllers/favouriteController.js";
const router = express.Router();

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Get all favourite items
 *     tags: [Favourites]
 *     description: Retrieves all products saved to the user's favourites list.
 *     responses:
 *       200:
 *         description: Successfully retrieved favourites.
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
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FavouriteItem'
 *       500:
 *         description: Server error.
 */
router.get("/", getFavourites);

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Add a product to favourites
 *     tags: [Favourites]
 *     description: Saves a product to the favourites list. Duplicate additions are handled gracefully.
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
 *     responses:
 *       201:
 *         description: Product successfully added to favourites.
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
 *                   example: '"Wireless Headphones" added to favourites!'
 *                 data:
 *                   $ref: '#/components/schemas/FavouriteItem'
 *       400:
 *         description: Missing productId.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Server error.
 */
router.post("/", addToFavourites);

/**
 * @swagger
 * /api/favorites/{id}:
 *   delete:
 *     summary: Remove a product from favourites
 *     tags: [Favourites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Favourite item ID to remove
 *     responses:
 *       200:
 *         description: Item removed from favourites.
 *       404:
 *         description: Favourite item not found.
 *       500:
 *         description: Server error.
 */
router.delete("/:id", removeFromFavourites);

export default router;
