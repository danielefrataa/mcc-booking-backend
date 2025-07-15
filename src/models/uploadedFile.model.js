'use strict';

module.exports = (sequelize, DataTypes) => {
  const UploadedFile = sequelize.define('UploadedFile', {
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
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Bookings',
        key: 'id'
      }
    },
    filePath: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fileType: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'UploadedFiles',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });

  UploadedFile.associate = function(models) {
    UploadedFile.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    UploadedFile.belongsTo(models.Booking, {
      foreignKey: 'bookingId',
      as: 'booking',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  };

  return UploadedFile;
};
