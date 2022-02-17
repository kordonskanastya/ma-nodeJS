const { unauthorized } = require('../statusCode');
const logger = require('../utils/logger');
const { hashPassword } = require('../utils');
const {
  successMessage,
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
    logger.info(`Access Token: ${accessToken}`);
    logger.info(`Refresh Token: ${refreshToken}`);
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
