const auth = require('./auth');
const common = require('./common');
const token = require('./token');
const hash = require('./hash');

module.exports = {
  ...auth,
  ...common,
  ...token,
  ...hash
};
