const { createHmac } = require('crypto');
const { passwordSecret } = require('../config');

function hashingPassword(password) {
  const hash = createHmac('sha256', passwordSecret)
               .update(password)
               .digest('hex');
  return hash;
}

module.exports = { hashingPassword };
