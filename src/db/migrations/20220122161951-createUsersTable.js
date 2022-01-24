module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Users', {
        userId: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.DataTypes.INTEGER
        },
        login: {
          allowNull: false,
          type: Sequelize.DataTypes.STRING
        },
        password: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
      },
    );
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
