'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Rooms', null, {}); // hapus dulu semua data
    await queryInterface.bulkInsert('Rooms', [
      {
        name: 'Ruang Audio Visual',
        capacity: 20,
        location: 'Lantai 3 - MCC',
        description: 'Ruang dengan peralatan audio visual lengkap untuk presentasi dan workshop.',
        imageUrl: '/uploads/ruang-audio-visual.jpg',
        pricePerHour: 100000,
        status: 'available',
        subsektorId: 1, // sesuaikan dengan id subsektor
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ruang Podcast',
        capacity: 10,
        location: 'Lantai 2 - MCC',
        description: 'Studio podcast kedap suara dengan peralatan lengkap.',
        imageUrl: '/uploads/ruang-podcast.jpg',
        pricePerHour: 80000,
        status: 'available',
        subsektorId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Tambahkan lebih banyak sesuai kebutuhan
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Rooms', null, {});
  }
};
