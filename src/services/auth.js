const { successMessage } = require('../utils');
const authenticatingUser = require('./helpers/loginCheck');
const { unauthorized } = require('../statusCode');

async function loginCheck (body) {
  try {
    if (!body.email || !body.password) {
      throw new Error('field email or password is absent');
    }
    await authenticatingUser(body);
    return successMessage({ message: 'You are logged-in' });
  } catch (err) {
    return { code: unauthorized, message: err.message };
  }

}

module.exports = { loginCheck };
