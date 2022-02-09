const { successMessage } = require('../utils');
const { unauthorized } = require('../statusCode');
const { env } = require('../config');
const { hashPassword } = require('../utils');
const {
  generateAccessToken,
  generateRefreshToken
 } = require('../utils');
const {
  putRefreshToken,
  getUserByEmail
} = require('./crud/user');

async function checkUserPassword(body) {
  const {email: emailUser, password: passwordUser} = body;
  const userFromDB = await getUserByEmail(emailUser);
  if (userFromDB.length === 0) {
    throw new Error('No user was found');
  }
  const hashUserPassword = hashPassword(passwordUser);
  if (hashUserPassword !== userFromDB.password) {
    throw new Error('Password is not correct');
  }
}

async function authenticateUser (body) {
    const { email } = body;
    await checkUserPassword(body);
    const accessToken = generateAccessToken(email);
    const refreshToken = generateRefreshToken(email);
    await putRefreshToken(email, refreshToken);
    if ( env === 'dev') {
      console.log(`Access Token: ${accessToken}`);
      console.log(`Refresh Token: ${refreshToken}`);
    }
  return accessToken;
}

async function loginCheck (body) {
  try {
    if (!body.email || !body.password) {
      throw new Error('field email or password is absent');
    }
    const accessToken = await authenticateUser(body);
    return successMessage({ accessToken });
  } catch (err) {
    return { code: unauthorized, message: err.message };
  }
}

module.exports = { loginCheck };
