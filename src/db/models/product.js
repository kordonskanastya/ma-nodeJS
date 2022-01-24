module.exports = (sequelize, DataTypes) =>{
  const Product = sequelize.define('Product', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    measure: {
      type: DataTypes.STRING,
      allowNull: false
    },
    measurevalue: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pricetype: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pricevalue: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  }, {});

  Product.associate = (models) => {
    Product.belongsTo(models.Item,
      {foreignKey: 'itemId'}
      );
    Product.belongsTo(models.Type,
      {foreignKey: 'typeId'}
      );
  };

  return Product;
};
