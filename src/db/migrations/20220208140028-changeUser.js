module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    await queryInterface. bulkUpdate('Users',
    { email: 'adminadmin@gmail.com' },
    { email: 'admin' }
    );
    await queryInterface. bulkUpdate('Users',
    {
      password:
      '72ef7dc00228b9ee55f886506c398608eab46a6523e154c77a19c428c235fe6b'
    },
    {
      password:
      'ba751a6b24b2c811a541f6daa6012387f99d592b1067e72e357a471b17a77431'
    }
    );
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface. bulkDelete('Users', {
      email: 'adminadmin@gmail.com',
      password:
        '72ef7dc00228b9ee55f886506c398608eab46a6523e154c77a19c428c235fe6b'
    });
  }
};
