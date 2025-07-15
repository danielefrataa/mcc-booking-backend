const express = require('express');
const router = express.Router();
const subsektorController = require('../controllers/subsektor.controller');

router.get('/', subsektorController.getAll); // endpoint: /api/subsektors

module.exports = router;
