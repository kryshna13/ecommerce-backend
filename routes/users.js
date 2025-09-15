const usersRouter = require('express').Router();
const ctrl = require('../controller/LoginRegisterController');
const { requireAuth, requireRole } = require('../middleware/auth');

// Public
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users management
 */
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - role
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
usersRouter.post('/register', ctrl.register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - role
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User login successfully
 *       400:
 *         description: Invalid input
 */
usersRouter.post('/login', ctrl.login);

// Authenticated
/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: get user details
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - role
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: successfull
 *       400:
 *         description: Invalid
 */

usersRouter.get('/me', requireAuth, ctrl.me);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - role
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User logout successfully
 *       400:
 *         description: Invalid input
 */

usersRouter.post('/logout', requireAuth, ctrl.logout);

// Example of role-protected route (Admin only)
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: admin checking
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - role
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: admin login successfully
 *       400:
 *         description: Invalid input
 */

usersRouter.get('/admin/ping', requireAuth, requireRole('Admin'), (req, res) => {
  res.json({ message: 'Admin area OK' });
});

// sample

usersRouter.get('/sample', function(req, res, next) {
  res.render('index', { title: 'user' });
});

module.exports = usersRouter;

