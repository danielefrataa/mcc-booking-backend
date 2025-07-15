// src/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = {
  // 🔐 Verifikasi JWT & injeksikan user ke req
  authenticate: async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = user; // Inject user ke setiap request
      next();
    } catch (err) {
      console.error('🔒 Auth error:', err.message); // 👈 log error lebih detail
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  },

  // 🔐 Batasi akses hanya role tertentu
  authorizeRoles: (...allowedRoles) => {
    return (req, res, next) => {
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden: insufficient role' });
      }
      next();
    };
  }
};
