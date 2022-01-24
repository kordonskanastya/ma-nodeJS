module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    login: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {timestamps: false});

  User.associate = (models) => {
    User.hasMany(models.Order,
      {foreignKey: 'userId'});
  };
  return User;
};
