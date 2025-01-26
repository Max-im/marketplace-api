import { Router } from 'express';
import controller from './item.controller';
import validator from './item.validator';
import { asyncHandler } from '../handlers';

const router = Router();

/**
 * @swagger
 * /item:
 *   post:
 *     tags: [Item]
 *     summary: List a new item for rent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemRequest'
 *     responses:
 *       201:
 *         description: Item listed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemResponse'
 *       400:
 *         description: Missing required fields
 */
router.post('/item', validator.createItem, asyncHandler(controller.createItem));

/**
 * @swagger
 * /item:
 *   get:
 *     tags: [Item]
 *     summary: Search for available items
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by item name
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *     responses:
 *       200:
 *         description: List of available items
 *         content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ItemResponse'
 */
router.get('/item', validator.getItems, asyncHandler(controller.getItems));

/**
 * @swagger
 * /item/{id}/rent:
 *   post:
 *     tags: [Item]
 *     summary: Rent an item for a specific date range
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the item to rent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RentRequest'
 *     responses:
 *       200:
 *         description: Item rented successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RentResponse'
 *       400:
 *         description: Missing fields or date conflict
 *       404:
 *         description: Item not found
 */
router.post('/item/:id/rent', validator.isValidId, validator.rentItem, asyncHandler(controller.rentItem));

/**
 * @swagger
 * /item/{id}/return:
 *   post:
 *     tags: [Item]
 *     summary: Return a rented item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the item to return
 *     responses:
 *       200:
 *         description: Item returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RentResponse'
 *       404:
 *         description: Item not found
 */
router.post('/item/:id/return', validator.isValidId, asyncHandler(controller.returnItem));

export { router as itemRouter };
