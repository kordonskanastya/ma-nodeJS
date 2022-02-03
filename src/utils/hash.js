const { createHmac } = require('crypto');
const config = require('../config');

function hashingPassword(password) {
  const hash = createHmac('sha256', config.passwordSecret)
               .update(password)
               .digest('hex');
  return hash;
}

module.exports = { hashingPassword };
