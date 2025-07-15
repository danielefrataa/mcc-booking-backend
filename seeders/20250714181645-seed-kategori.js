'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Kategoris', [
      { id: 1, nama: 'Seni Pertunjukan', description: 'Bidang seni panggung dan pertunjukan langsung' },
      { id: 2, nama: 'Desain', description: 'Bidang visual dan komunikasi desain' },
      { id: 3, nama: 'Media', description: 'Bidang media digital dan cetak' },
      { id: 4, nama: 'Kuliner', description: 'Bidang makanan dan minuman kreatif' },
      { id: 5, nama: 'Kriya', description: 'Bidang kerajinan tangan dan handmade' },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Kategoris', null, {});
  }
};
