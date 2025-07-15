// src/routes/users.routes.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller'); // ✅ Ini harus di atas sebelum dipakai
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');

// ✅ Sekarang boleh console log setelah deklarasi
console.log({
  getAllUsers: usersController.getAllUsers,
  getUserById: usersController.getUserById,
});

router.get('/me', authenticate, usersController.getProfile);
router.put('/me', authenticate, usersController.updateProfile);

router.get('/', authenticate, authorizeRoles('admin'), usersController.getAllUsers);
router.get('/:id', authenticate, authorizeRoles('admin'), usersController.getUserById);
router.delete('/:id', authenticate, authorizeRoles('admin'), usersController.deleteUser);

module.exports = router;
