module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Users', {
        userId: {
          allowNull: false,
          type: Sequelize.DataTypes.INTEGER
        },
        orderId: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Orders',
            key: 'orderId'
          },
        },
      },
    );
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
