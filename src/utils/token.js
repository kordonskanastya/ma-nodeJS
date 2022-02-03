const jwt = require('jsonwebtoken');
const {
  accessTokenSecret,
  refreshTokenSecret
} = require('../config');

function generateAccessToken(email) {
  return jwt.sign({ email }, accessTokenSecret, { expiresIn: '12h' });
}

function generateRefreshToken(email) {
  return jwt.sign({ email }, refreshTokenSecret);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken
};
