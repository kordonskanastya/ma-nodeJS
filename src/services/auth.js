const { ENVIRONMENT } = require('../constants');
const {
  checkingPassword,
  successMessage,
  generateAccessToken,
  generateRefreshToken
 } = require('../utils');
const { putRefreshToken } = require('./crud/user');

// eslint-disable-next-line consistent-return
async function loginCheck (body) {
  if (!body.email || !body.password) {
    throw new Error('field email or password is absent');
  }
  const { email } = body;
  await checkingPassword(body);
  const accessToken = generateAccessToken(email);
  const refreshToken = generateRefreshToken(email);
  await putRefreshToken(email, refreshToken);
  if ( ENVIRONMENT === 'dev') {
    console.log(`Access Token: ${accessToken}`);
    console.log(`Refresh Token: ${refreshToken}`);
  }
  return successMessage({ message: 'You are logged-in' });
}

module.exports = { loginCheck };
