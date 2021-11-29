const services = require('../services');

const badRequest = 400;

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
  const parsedBody = JSON.parse(req.body);
  const {message, code} = services.postFilter(
    req.params,
    parsedBody
    );
  sendResponse(message, code, res);
}

function getTopprice(req, res) {
  const {message, code} = services.getTopprice();
  sendResponse(message, code, res);
}

function postTopprice(req, res) {
  const parsedBody = JSON.parse(req.body);
  const {message, code} = services.postTopprice(parsedBody);
    sendResponse(message, code, res);
}

function getCommonprice(req, res) {
  const {message, code} = services.getCommonprice();
  sendResponse(message, code, res);
}

function postCommonprice(req, res) {
  const parsedBody = JSON.parse(req.body);
  const {message, code} = services.postCommonprice(parsedBody);
  sendResponse(message, code, res);
}

function postData(req, res) {
  const parsedBody = JSON.parse(req.body);
  const {message, code} = services.postData(parsedBody);
  sendResponse(message, code, res);
}

function notFound(req, res) {
  const { message, code } = services.notFound();
  sendResponse(message, code, res);
}

function getPromise(req, res) {
  services.getPromise().then(({message, code}) => {
    sendResponse(message, code, res);
  })
  .catch(error => {
    sendResponse(error, badRequest, res);
  });
}

function postPromise(req, res) {
  const parsedBody = JSON.parse(req.body);
  services.postPromise(parsedBody).then(({message, code}) => {
    sendResponse(message, code, res);
  })
  .catch(error => {
    sendResponse(error, badRequest, res);
  });
}

function getPromisify(req, res) {
  services.getPromisify().then(({message, code}) => {
    sendResponse(message, code, res);
  })
  .catch(error => {
    sendResponse(error, badRequest, res);
  });
}

function postPromisify(req, res) {
  const parsedBody = JSON.parse(req.body);
  services.postPromisify(parsedBody).then(({message, code}) => {
    sendResponse(message, code, res);
  })
  .catch(error => {
    sendResponse(error, badRequest, res);
  });
}

function getAsync(req, res) {
  services.getAsync().then(({message, code}) => {
    sendResponse(message, code, res);
  })
  .catch(error => {
    sendResponse(error, badRequest, res);
  });
}

function postAsync(req, res) {
  const parsedBody = JSON.parse(req.body);
  services.postAsync(parsedBody).then(({message, code}) => {
    sendResponse(message, code, res);
  })
  .catch(error => {
    sendResponse(error, badRequest, res);
  });
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
  postData,
  getPromise,
  postPromise,
  getPromisify,
  postPromisify,
  getAsync,
  postAsync
};
