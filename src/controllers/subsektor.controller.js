const { Subsektor, Kategori } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const subsektors = await Subsektor.findAll({
        include: {
          model: Kategori,
          as: 'kategori',
          attributes: ['id', 'nama']
        }
      });
      res.json(subsektors);
    } catch (error) {
      console.error('Error fetching subsektors:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
