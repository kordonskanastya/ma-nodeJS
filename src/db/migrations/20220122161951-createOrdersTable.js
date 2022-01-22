module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Orders', {
        orderId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.DataTypes.INTEGER
        },
        productId: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Products',
            key: 'id'
          },
        },
        quantity: {
          allowNull: false,
          type: Sequelize.DataTypes.INTEGER
        },
        createdAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
        updatedAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
        deletedAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
      },
    );
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};
