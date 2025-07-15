'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Kecamatans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      kotaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Kotas', // ✅ sesuai dengan table Kotas
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      } // ✅ tambahkan koma di sini jika ada field lanjutan
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Kecamatans');
  }
};
