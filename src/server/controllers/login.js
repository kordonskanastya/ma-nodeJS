const services = require('../../services');
const { badRequest } = require('../../statusCode');

async function loginCheck (req, res) {
  try {
    const {message, code} = await services.loginCheck(req.body);
    res.status(code).send(message);
  }
  catch(error) {
    res.status(badRequest).send({error: error.message});
  };
}

module.exports = { loginCheck };
