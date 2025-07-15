'use strict';

module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pricePerHour: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('available', 'maintenance', 'unavailable'),
      allowNull: false,
      defaultValue: 'available'
    },
    subsektorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Subsektors',
        key: 'id'
      }
    }
  }, {
    tableName: 'Rooms',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });

  Room.associate = function(models) {
    // Jika kamu punya model Subsektor, buat relasi berikut:
    Room.belongsTo(models.Subsektor, {
      foreignKey: 'subsektorId',
      as: 'subsektor',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  };

  return Room;
};
