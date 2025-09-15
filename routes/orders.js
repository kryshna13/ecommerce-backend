const express = require('express');
const orderRouter = express.Router();
const Order = require('../model/Order');
const { requireAuth } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 */
orderRouter.get('/', requireAuth, async (req, res) => {
  const orders = await Order.find().populate('user');
  res.json(orders);
});

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user, items, paymentMethod, totalAmount]
 *             properties:
 *               user: { type: string }
 *               items: {
 *                 type: array,
 *                 items: {
 *                   type: object,
 *                   properties: {
 *                     productId: { type: string },
 *                     quantity: { type: number },
 *                     price: { type: number }
 *                   }
 *                 }
 *               }
 *               shippingAddress: {
 *                 type: object,
 *                 properties: {
 *                   fullName: { type: string },
 *                   address: { type: string },
 *                   city: { type: string },
 *                   postalCode: { type: string },
 *                   country: { type: string }
 *                 }
 *               }
 *               paymentMethod: { type: string }
 *               totalAmount: { type: number }
 *     responses:
 *       201:
 *         description: Order created
 */
orderRouter.post('/', requireAuth, async (req, res) => {
  const order = new Order(req.body);
  await sendOrderEmail(email, order);
  await order.save();
  res.status(201).json(order);
});

orderRouter.get('/:id', requireAuth, async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

orderRouter.put('/:id', requireAuth, async (req, res) => {
  const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

orderRouter.delete('/:id', requireAuth, async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: 'Order deleted' });
});

module.exports = orderRouter;
