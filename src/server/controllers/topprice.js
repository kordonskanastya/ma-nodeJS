const services = require('../../services');

async function getTopprice(req, res) {
  const {message, code} = await services.getTopprice();
  res.status(code).send(message);
}

function postTopprice(req, res) {
  const {message, code} = services.postTopprice(req.body);
  res.status(code).send(message);
}

module.exports = {
  getTopprice,
  postTopprice
};
