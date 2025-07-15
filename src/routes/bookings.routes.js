// src/routes/booking.routes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookings.controller');
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');

// ✅ Buat booking baru (user login)
router.post('/', authenticate, bookingController.createBooking);

// ✅ Ambil booking milik user login
router.get('/me', authenticate, bookingController.getMyBookings);

// ✅ Ambil semua booking (admin atau staff saja)
router.get('/', authenticate, authorizeRoles('admin', 'staff'), bookingController.getBookings);

// ✅ Update booking (user hanya bisa update miliknya sendiri)
router.put('/:id', authenticate, bookingController.updateBooking);

// ✅ Cancel booking
router.delete('/:id', authenticate, bookingController.cancelBooking);

module.exports = router;
