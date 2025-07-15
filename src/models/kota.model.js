module.exports = (sequelize, DataTypes) => {
  const Kota = sequelize.define('Kota', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'Kotas', // Sesuaikan dengan nama tabel plural
    timestamps: false   // Karena kamu tidak pakai createdAt/updatedAt
  });

  Kota.associate = (models) => {
    // Contoh relasi: satu kota punya banyak kecamatan / user
    Kota.hasMany(models.Kecamatan, { foreignKey: 'kotaId' });
    Kota.hasMany(models.User, { foreignKey: 'kotaId' });
  };

  return Kota;
};
