module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Users',
      'refreshToken',
      { type: Sequelize.STRING }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Users', 'refreshToken');
  }
};
