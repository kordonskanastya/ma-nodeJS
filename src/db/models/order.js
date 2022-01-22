module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    orderId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {timestamps: false});

  Order.associate = (models) => {
    Order.hasOne(models.User);
  };
  return Order;
};
