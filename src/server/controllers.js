const services = require('../services');

function home(req, res) {
  const { message, code } = services.home();
  res.write(message);
  res.statusCode = code;
  res.end();
}

function messageAndEnd(message, code, res) {
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(message));
  res.statusCode = code;
  res.end();
}

function getFilter(req, res) {
  const {message, code} = services.getFilter(req.params);
  messageAndEnd(message, code, res);
}

function postFilter(req, res) {
  const {message, code} = services.postFilter(
    req.params,
    JSON.parse(req.body)
    );
  messageAndEnd(message, code, res);
}

function getTopprice(req, res) {
  const {message, code} = services.getTopprice();
  messageAndEnd(message, code, res);
}

function postTopprice(req, res) {
  const {message, code} = services.postTopprice(JSON.parse(req.body));
    messageAndEnd(message, code, res);
}

function getCommonprice(req, res) {
  const {message, code} = services.getCommonprice();
  messageAndEnd(message, code, res);
}

function postCommonprice(req, res) {
  const {message, code} = services.postCommonprice(JSON.parse(req.body));
  messageAndEnd(message, code, res);
}

function notFound(req, res) {
  const { message, code } = services.notFound();
  res.statusCode = code;
  res.write(message);
  res.end();
}

module.exports = {
  home,
  notFound,
  getFilter,
  postFilter,
  getTopprice,
  postTopprice,
  getCommonprice,
  postCommonprice
};
