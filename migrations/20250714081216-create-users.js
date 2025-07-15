'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      googleId: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true
      },
      role: {
        type: Sequelize.ENUM('user', 'admin', 'staff', 'marketing'),
        defaultValue: 'user',
        allowNull: false
      },
      isProfileComplete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      tipe_user: {
        type: Sequelize.ENUM('personal', 'instansi'),
        allowNull: true
      },
      nama: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      telp: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      gender: {
        type: Sequelize.ENUM('Laki-laki', 'Perempuan', 'Lainnya'),
        allowNull: true
      },
      logo: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      nama_instansi: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      website: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      deskripsi: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      kotaId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Kotas', // ✅ fixed
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      kecamatanId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Kecamatans', // ✅ fixed
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      kategoriId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Kategoris', // ✅ fixed
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      subsektorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Subsektors', // ✅ fixed
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      facebook: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      instagram: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      twitter: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      tiktok: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      youtube: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
