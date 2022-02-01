const services = require('../../services');

async function getCommonprice(req, res) {
  const {message, code} = await services.getCommonprice();
  res.status(code).send(message);
}

function postCommonprice(req, res) {
  const {message, code} = services.postCommonprice(req.body);
  res.status(code).send(message);
}

module.exports = {
  getCommonprice,
  postCommonprice
};
