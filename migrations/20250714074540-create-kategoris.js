'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Kategoris', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      }, // ✅ FIXED: koma penting di sini
      // Tidak ada timestamps karena di model Kategori kita set timestamps: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Kategoris');
  }
};
