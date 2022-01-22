module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {timestamps: false});

  User.associate = (models) => {
    User.hasMany(models.Order);
  };
  return User;
};
