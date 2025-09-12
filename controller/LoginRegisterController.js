
// controllers/auth.controller.js
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const signJwt = (user) => {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (role && !['Admin', 'Customer'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already in use' });

    const user = await User.create({ name, email, password, role: role || 'Customer' });
    const token = signJwt(user);

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, remember } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update login metadata
    user.lastLoginAt = new Date();
    user.loginCount = (user.loginCount || 0) + 1;
    await user.save();

    // Issue JWT
    const token = jwt.sign(
      { sub: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: remember ? '7d' : process.env.JWT_EXPIRES_IN || '1d' }
    );

    // Session-based tracking (not for auth; for tracking/limit/visibility)
    req.session.userId = user._id.toString();
    req.session.role = user.role;
    req.session.lastActiveAt = Date.now();

    res.json({
      message: 'Login successful',
      token,
      sessionId: req.session.id,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

exports.me = async (req, res) => {
  res.json({ user: req.user, session: { id: req.session.id, lastActiveAt: req.session.lastActiveAt } });
};

exports.logout = async (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logged out' });
  });
};
