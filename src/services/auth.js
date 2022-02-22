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
    throw new Error('Email or password is not correct');
  }
  const hashUserPassword = hashPassword(passwordUser);
  if (hashUserPassword !== userFromDB.password) {
    throw new Error('Email or password is not correct');
  }
}

async function authenticateUser (body) {
  const { email } = body;
  await checkUserPassword(body);
  const accessToken = generateAccessToken(email);
  const refreshToken = generateRefreshToken(email);
  await putRefreshToken(email, refreshToken);
  return accessToken;
}

async function loginCheck (body) {
  try {
    if (!body.email || !body.password) {
      throw new Error('Email or password is absent');
    }
    const accessToken = await authenticateUser(body);
    return successMessage({ accessToken });
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = { loginCheck };
