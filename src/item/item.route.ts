import { Router } from 'express';
import controller from './item.controller';
import validator from './item.validator';
import { asyncHandler } from '../handlers';

const router = Router();

/**
 * @swagger
 * /item:
 *   post:
 *     summary: List a new item for rent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item listed successfully
 *       400:
 *         description: Missing required fields
 */
router.post('/item', validator.createItem, asyncHandler(controller.createItem));

/**
 * @swagger
 * /item:
 *   get:
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
 */
router.get('/item', validator.getItems, asyncHandler(controller.getItems));

/**
 * @swagger
 * /item/{id}/rent:
 *   post:
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
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Item rented successfully
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
 *       404:
 *         description: Item not found
 */
router.post('/item/:id/return', validator.isValidId, asyncHandler(controller.returnItem));

export { router as itemRouter };
