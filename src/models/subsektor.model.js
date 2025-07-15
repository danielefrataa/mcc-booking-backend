'use strict';

module.exports = (sequelize, DataTypes) => {
  const Subsektor = sequelize.define('Subsektor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    kategoriId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Kategoris', // Harus plural sesuai nama tabel
        key: 'id'
      }
    }
  }, {
    tableName: 'Subsektors',
    timestamps: false
  });

  Subsektor.associate = function(models) {
    // Relasi ke Kategori (Subsektor belongsTo Kategori)
    Subsektor.belongsTo(models.Kategori, {
      foreignKey: 'kategoriId',
      as: 'kategori',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return Subsektor;
};
