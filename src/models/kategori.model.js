module.exports = (sequelize, DataTypes) => {
  const Kategori = sequelize.define('Kategori', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'Kategoris', // pluralize
    timestamps: false
  });

  Kategori.associate = (models) => {
    Kategori.hasMany(models.Subsektor, {
      foreignKey: 'kategoriId',
      as: 'subsektors'
    });

    Kategori.hasMany(models.User, {
      foreignKey: 'kategoriId',
      as: 'users'
    });
  };

  return Kategori;
};
