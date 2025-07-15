// src/routes/room.routes.js
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/rooms.controller');

// Middleware autentikasi bisa ditambahkan jika diperlukan
router.get('/', roomController.getAllRooms);
router.get('/:id', roomController.getRoomById);
router.post('/', roomController.createRoom);
router.put('/:id', roomController.updateRoom);
router.delete('/:id', roomController.deleteRoom);

module.exports = router;
