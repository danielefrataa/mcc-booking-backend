// src/controllers/kecamatan.controller.js
const { Kecamatan, Kota } = require('../models'); // ✅ tambahkan Kota

module.exports = {
  async getAll(req, res) {
    try {
      const kecamatans = await Kecamatan.findAll({
        include: {
          model: Kota,
          as: 'kota',
          attributes: ['id', 'nama']
        }
      });
      res.json(kecamatans);
    } catch (error) {
      console.error('Error fetching kecamatans:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
