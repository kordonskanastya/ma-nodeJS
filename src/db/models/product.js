module.exports = (sequelize, DataTypes) =>
  sequelize.define('Product', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
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
