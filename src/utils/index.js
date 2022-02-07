const common = require('./common');
const token = require('./token');
const hashPassword = require('./hashPassword');

module.exports = {
  ...common,
  ...token,
  hashPassword
};
