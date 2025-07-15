const express = require('express');
const router = express.Router();
const checkinController = require('../controllers/checkin.controller');
const { authenticate } = require('../middlewares/auth.middleware');

// Endpoint check-in menggunakan booking_code
router.post('/', authenticate, checkinController.checkIn);

module.exports = router;
