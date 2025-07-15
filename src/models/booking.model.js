'use strict';

module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Rooms',
        key: 'id'
      }
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    purpose: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'booked', 'checked-in', 'completed', 'cancelled', 'declined'),
      allowNull: false,
      defaultValue: 'pending'
    },
    checkInTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    checkOutTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    booking_code: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    kategoriId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Kategoris',
        key: 'id'
      }
    }
  }, {
    tableName: 'Bookings',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });

  Booking.associate = function(models) {
    Booking.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Booking.belongsTo(models.Room, {
      foreignKey: 'roomId',
      as: 'room',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Booking.belongsTo(models.Kategori, {
      foreignKey: 'kategoriId',
      as: 'kategori',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  };

  return Booking;
};
