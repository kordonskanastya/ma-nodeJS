module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    itemId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {timestamps: false});

  Item.associate = (models) => {
    Item.hasMany(models.Product, { foreignKey: 'itemId'});
  };
  return Item;
};
