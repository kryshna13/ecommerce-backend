const express = require('express');
const productRouter = express.Router();
const Product = require('../model/product');
const { requireAuth, authorizeAdmin } = require('../middleware/auth');
/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management
 */
/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of products
 */
productRouter.get('/', async (req, res) => {
  const products = await Product.find().populate('category');
  res.json(products);
});

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               price: { type: number }
 *               category: { type: string }
 *               description: { type: string}
 *               stock: { type: string}
 *               images: { type: string}
 *               ratings: { type: string}
 *               reviews: { type: string}
 *               createdat: {type: string}
 *     responses:
 *       201:
 *         description: Product created
 */
productRouter.post('/', requireAuth, authorizeAdmin, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

productRouter.put('/:id', requireAuth, authorizeAdmin, async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

productRouter.delete('/:id', requireAuth, authorizeAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = productRouter;
