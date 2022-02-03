module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      email: 'admin',
      password:
        'ba751a6b24b2c811a541f6daa6012387f99d592b1067e72e357a471b17a77431'
    }]);
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface. bulkDelete('Users', {
      email: 'admin',
      password:
        'ba751a6b24b2c811a541f6daa6012387f99d592b1067e72e357a471b17a77431'
    });
  }
};
