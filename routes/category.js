const express = require('express');
const categoryRouter = express.Router();
const Category = require('../model/Category');
const { requireAuth, authorizeAdmin } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "66f6e1faedcba01234567890"
 *         name:
 *           type: string
 *           example: "Electronics"
 *         description:
 *           type: string
 *           example: "Gadgets, devices, and accessories"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-15T09:30:00.000Z"
 *     CreateCategoryDto:
 *       type: object
 *       required: [name]
 *       properties:
 *         name:
 *           type: string
 *           example: "Books"
 *         description:
 *           type: string
 *           example: "All kinds of books"
 *     UpdateCategoryDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Books & Magazines"
 *         description:
 *           type: string
 *           example: "Printed and digital reading material"
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: List categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Array of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
categoryRouter.get('/', async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json(categories);
});

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get category by id
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category id
 *     responses:
 *       200:
 *         description: Category found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 */
categoryRouter.get('/:id', async (req, res) => {
  const doc = await Category.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: 'Category not found' });
  res.json(doc);
});

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryDto'
 *     responses:
 *       201:
 *         description: Created category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Validation error or duplicate name
 *       401:
 *         description: Unauthorized
 */
categoryRouter.post('/', requireAuth, async (req, res) => {
  try {
    const created = await Category.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({ message: 'Category name must be unique' });
    }
    return res.status(400).json({ message: e.message });
  }
});

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Replace category (admin only)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategoryDto'
 *     responses:
 *       200:
 *         description: Updated category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admins only
 *       404:
 *         description: Category not found
 */
categoryRouter.put('/:id', requireAuth, authorizeAdmin, async (req, res) => {
  const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!updated) return res.status(404).json({ message: 'Category not found' });
  res.json(updated);
});

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Delete confirmation
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
categoryRouter.delete('/:id', requireAuth, async (req, res) => {
  const deleted = await Category.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Category not found' });
  res.json({ message: 'Category deleted' });
});

module.exports = categoryRouter;
