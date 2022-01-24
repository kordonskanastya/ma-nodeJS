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
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  }, {});

  Order.associate = (models) => {
    Order.belongsTo(models.User,
      {foreignKey: 'userId', foreignKeyConstraint: true});
  };
  return Order;
};
