const services = require('../../services');

async function getFilter(req, res) {
  const {message, code} = await services.getFilter(req.query);
  res.status(code).send(message);
}

function postFilter(req, res) {
  const {message, code} = services.postFilter(
    req.query,
    req.body
    );
  res.status(code).send(message);
}

module.exports = {
  getFilter,
  postFilter
};
