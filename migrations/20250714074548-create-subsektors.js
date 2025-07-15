'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subsektors', {
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
      kategoriId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Kategoris', // harus plural sesuai nama tabel Kategori
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Subsektors');
  }
};
