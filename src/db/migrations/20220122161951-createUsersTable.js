module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Users', {
        id: {
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
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
