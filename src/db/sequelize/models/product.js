module.exports = (sequelize, DataTypes) =>
  sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
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
