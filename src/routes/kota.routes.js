const express = require('express');
const router = express.Router();
const kotaController = require('../controllers/kota.controller');

router.get('/', kotaController.getAll); // endpoint: /api/kotas

module.exports = router;
