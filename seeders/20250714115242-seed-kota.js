'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Kotas', [
      { id: 1, nama: 'Kota Malang' },
      { id: 2, nama: 'Kab. Batu' },
      { id: 3, nama: 'Kab. Malang' },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Kotas', null, {});
  }
};
