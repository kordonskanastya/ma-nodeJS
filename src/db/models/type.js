module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    typeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {timestamps: false});

  Type.associate = (models) => {
    Type.hasMany(models.Product);
  };

  return Type;
};
