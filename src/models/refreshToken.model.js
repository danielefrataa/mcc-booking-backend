module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define('RefreshToken', {
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING,
    expiresAt: DataTypes.DATE
  }, {
    tableName: 'RefreshTokens',
    timestamps: true,
    updatedAt: false
  });

  RefreshToken.associate = (models) => {
    RefreshToken.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return RefreshToken;
};
