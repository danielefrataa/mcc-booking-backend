const express = require('express');
const router = express.Router();
const kecamatanController = require('../controllers/kecamatan.controller');

router.get('/', kecamatanController.getAll); // endpoint: /api/kecamatans

module.exports = router;
