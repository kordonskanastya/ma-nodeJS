const services = require('../services');

function sendResponse(message, code, res) {
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(message));
  res.statusCode = code;
  res.end();
}

function getHomePage(req, res) {
  const { message, code } = services.getHomePage();
  sendResponse(message, code, res);
}

function getFilter(req, res) {
  const {message, code} = services.getFilter(req.params);
  sendResponse(message, code, res);
}

function postFilter(req, res) {
  const {message, code} = services.postFilter(
    req.params,
    JSON.parse(req.body)
    );
  sendResponse(message, code, res);
}

function getTopprice(req, res) {
  const {message, code} = services.getTopprice();
  sendResponse(message, code, res);
}

function postTopprice(req, res) {
  const {message, code} = services.postTopprice(JSON.parse(req.body));
    sendResponse(message, code, res);
}

function getCommonprice(req, res) {
  const {message, code} = services.getCommonprice();
  sendResponse(message, code, res);
}

function postCommonprice(req, res) {
  const {message, code} = services.postCommonprice(JSON.parse(req.body));
  sendResponse(message, code, res);
}

function postData(req, res) {
  const {message, code} = services.postData(JSON.parse(req.body));
  sendResponse(message, code, res);
}

function notFound(req, res) {
  const { message, code } = services.notFound();
  sendResponse(message, code, res);
}


module.exports = {
  getHomePage,
  notFound,
  getFilter,
  postFilter,
  getTopprice,
  postTopprice,
  getCommonprice,
  postCommonprice,
  postData
};
