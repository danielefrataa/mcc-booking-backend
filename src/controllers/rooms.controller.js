// src/controllers/room.controller.js
const { Room, Subsektor } = require('../models');

module.exports = {
  // GET /api/rooms
  async getAllRooms(req, res) {
    try {
      const rooms = await Room.findAll({
        include: {
          model: Subsektor,
          as: 'subsektor',
          attributes: ['id', 'nama']
        }
      });
      res.status(200).json(rooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // GET /api/rooms/:id
  async getRoomById(req, res) {
    try {
      const room = await Room.findByPk(req.params.id, {
        include: {
          model: Subsektor,
          as: 'subsektor',
          attributes: ['id', 'nama']
        }
      });
      if (!room) return res.status(404).json({ message: 'Room not found' });
      res.status(200).json(room);
    } catch (error) {
      console.error('Error fetching room by ID:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // POST /api/rooms
  async createRoom(req, res) {
    try {
      const room = await Room.create(req.body);
      res.status(201).json({ message: 'Room created successfully', room });
    } catch (error) {
      console.error('Error creating room:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // PUT /api/rooms/:id
  async updateRoom(req, res) {
    try {
      const room = await Room.findByPk(req.params.id);
      if (!room) return res.status(404).json({ message: 'Room not found' });

      await room.update(req.body);
      res.status(200).json({ message: 'Room updated successfully', room });
    } catch (error) {
      console.error('Error updating room:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // DELETE /api/rooms/:id
  async deleteRoom(req, res) {
    try {
      const room = await Room.findByPk(req.params.id);
      if (!room) return res.status(404).json({ message: 'Room not found' });

      await room.destroy();
      res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
      console.error('Error deleting room:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
