module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Types', {
        typeId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.DataTypes.INTEGER
        },
        type: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        },
      }
    );
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Types');
  }
};
