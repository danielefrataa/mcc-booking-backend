module.exports = (sequelize, DataTypes) => {
  const Kecamatan = sequelize.define('Kecamatan', {
    nama: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    kotaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'Kecamatans',
    timestamps: false
  });

  Kecamatan.associate = (models) => {
    Kecamatan.belongsTo(models.Kota, {
      foreignKey: 'kotaId',
      as: 'kota'
    });

    Kecamatan.hasMany(models.User, {
      foreignKey: 'kecamatanId',
      as: 'users'
    });
  };

  return Kecamatan;
};
