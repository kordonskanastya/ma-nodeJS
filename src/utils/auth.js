const { hashingPassword } = require('./hash');
const { getUserByEmail } = require('../services/crud/user');

async function checkingPassword(body) {
  const {email: emailUser, password: passwordUser} = body;
  const userFromDB = await getUserByEmail(emailUser);
  if (userFromDB.length === 0) {
    throw new Error('No user was found');
  }
  const hashUserPassword = hashingPassword(passwordUser);
  if (hashUserPassword !== userFromDB.password) {
    throw new Error('Password');
  }
}

module.exports = {
  checkingPassword
};
