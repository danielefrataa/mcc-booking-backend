module.exports = (sequelize, DataTypes) => {
  const Checkin = sequelize.define('Checkin', {
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    checkInTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    checkOutTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active', 'completed', 'missed'),
      defaultValue: 'active',
      allowNull: false
    }
  }, {
    tableName: 'Checkins',
    timestamps: true
  });

  Checkin.associate = (models) => {
    Checkin.belongsTo(models.Booking, {
      foreignKey: 'bookingId',
      as: 'booking'
    });
  };

  return Checkin;
};
