'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Subsektors', [
      { nama: 'Teater', kategoriId: 1 },
      { nama: 'Tari Tradisional', kategoriId: 1 },
      { nama: 'Desain Grafis', kategoriId: 2 },
      { nama: 'Desain Interior', kategoriId: 2 },
      { nama: 'Film & Animasi', kategoriId: 3 },
      { nama: 'Fotografi', kategoriId: 3 },
      { nama: 'Kuliner Tradisional', kategoriId: 4 },
      { nama: 'Minuman Kekinian', kategoriId: 4 },
      { nama: 'Batik', kategoriId: 5 },
      { nama: 'Keramik', kategoriId: 5 },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Subsektors', null, {});
  }
};
