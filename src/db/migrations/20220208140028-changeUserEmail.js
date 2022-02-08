module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    await queryInterface. bulkUpdate('Users',
    { email: 'adminadmin@gmail.com' },
    { email: 'admin' }
    );
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface. bulkDelete('Users', {
      email: 'adminadmin@gmail.com',
      password:
        'ba751a6b24b2c811a541f6daa6012387f99d592b1067e72e357a471b17a77431'
    });
  }
};
