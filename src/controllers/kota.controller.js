// src/controllers/kota.controller.js
const { Kota } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const kotas = await Kota.findAll();
      res.json(kotas);
    } catch (error) {
      console.error('Error fetching kotas:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
