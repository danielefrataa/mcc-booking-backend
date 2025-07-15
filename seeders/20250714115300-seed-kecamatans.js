'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Kecamatans', [
      // Kota Malang (kotaId: 1)
      { nama: 'Klojen', kotaId: 1 },
      { nama: 'Kedungkandang', kotaId: 1 },
      { nama: 'Blimbing', kotaId: 1 },
      { nama: 'Lowokwaru', kotaId: 1 },
      { nama: 'Sukun', kotaId: 1 },

      // Kab. Batu (kotaId: 2)
      { nama: 'Batu', kotaId: 2 },
      { nama: 'Bumiaji', kotaId: 2 },
      { nama: 'Junrejo', kotaId: 2 },

      // Kab. Malang (kotaId: 3)
      { nama: 'Dampit', kotaId: 3 },
      { nama: 'Tumpang', kotaId: 3 },
      { nama: 'Turen', kotaId: 3 },
      { nama: 'Dau', kotaId: 3 },
      { nama: 'Pakis', kotaId: 3 },
      { nama: 'Singosari', kotaId: 3 },
      { nama: 'Karangploso', kotaId: 3 },
      { nama: 'Pujon', kotaId: 3 },
      { nama: 'Wagir', kotaId: 3 },
      { nama: 'Ngajum', kotaId: 3 },
      // (Bisa ditambahkan lagi sesuai kebutuhan)
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Kecamatans', null, {});
  }
};
