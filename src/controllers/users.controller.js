const { User } = require('../models');

module.exports = {
  async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      console.error('🔴 Get Profile Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const updateFields = {};
      ['nama', 'telp', 'alamat', 'gender', 'tipe_user', 'nama_instansi', 'logo'].forEach(field => {
        if (req.body[field] !== undefined) {
          updateFields[field] = req.body[field];
        }
      });

      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      await user.update(updateFields);
      res.status(200).json({ message: 'Profile updated successfully', data: user });
    } catch (error) {
      console.error('🔴 Update Profile Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('🔴 Delete User Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error('🔴 Get All Users Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      console.error('🔴 Get User By ID Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
