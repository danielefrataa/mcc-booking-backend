module.exports = (sequelize, DataTypes) => {
  const ActivityLog = sequelize.define('ActivityLog', {
    userId: DataTypes.INTEGER,
    action: DataTypes.STRING,
    metadata: DataTypes.TEXT
  }, {
    tableName: 'ActivityLogs',
    timestamps: true,
    updatedAt: false // only use createdAt
  });

  ActivityLog.associate = (models) => {
    ActivityLog.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return ActivityLog;
};
