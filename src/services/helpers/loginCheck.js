const { ENVIRONMENT } = require('../../constants');
const { hashingPassword } = require('../../utils');
const {
  generateAccessToken,
  generateRefreshToken
 } = require('../../utils');
const {
  putRefreshToken,
  getUserByEmail
} = require('../crud/user');

async function checkingPassword(body) {
  const {email: emailUser, password: passwordUser} = body;
  const userFromDB = await getUserByEmail(emailUser);
  if (userFromDB.length === 0) {
    throw new Error('No user was found');
  }
  const hashUserPassword = hashingPassword(passwordUser);
  if (hashUserPassword !== userFromDB.password) {
    throw new Error('Password is not correct');
  }
}

async function loginCheck (body) {
    const { email } = body;
    await checkingPassword(body);
    const accessToken = generateAccessToken(email);
    const refreshToken = generateRefreshToken(email);
    await putRefreshToken(email, refreshToken);
    if ( ENVIRONMENT === 'dev') {
      console.log(`Access Token: ${accessToken}`);
      console.log(`Refresh Token: ${refreshToken}`);
    }
}

module.exports = loginCheck;
