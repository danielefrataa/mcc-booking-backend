const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,          // ✅ ubah: boleh kosong
      field: 'nama'             // kolom di DB tetap 'nama'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true           // ✅ ubah: boleh kosong (karena Google tidak punya password)
    },
    role: {
      type: DataTypes.ENUM('user', 'marketing', 'front-office'),
      defaultValue: 'user'
    },
    googleId: {
      type: DataTypes.STRING,   // ✅ tambahkan untuk OAuth
      allowNull: true,
      unique: true
    },
    isProfileComplete: {
      type: DataTypes.BOOLEAN,  // ✅ opsional: bantu frontend tahu apakah perlu melengkapi data
      defaultValue: false
    }
  }, {
    tableName: 'Users',
    timestamps: false,
  });

  return User;
};
