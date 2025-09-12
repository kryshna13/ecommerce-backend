const usersRouter = require('express').Router();
const ctrl = require('../controller/LoginRegisterController');
const { requireAuth, requireRole } = require('../middleware/auth');

// Public
usersRouter.post('/register', ctrl.register);
usersRouter.post('/login', ctrl.login);

// Authenticated
usersRouter.get('/me', requireAuth, ctrl.me);
usersRouter.post('/logout', requireAuth, ctrl.logout);

// Example of role-protected route (Admin only)
usersRouter.get('/admin/ping', requireAuth, requireRole('Admin'), (req, res) => {
  res.json({ message: 'Admin area OK' });
});

// sample

usersRouter.get('/sample', function(req, res, next) {
  res.render('index', { title: 'user' });
});

module.exports = usersRouter;

