const services = require('../services');
const { badRequest } = require('../statusCode');

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
  const {message, code} = services.getFilter(req.query);
  sendResponse(message, code, res);
}

function postFilter(req, res) {
  const {message, code} = services.postFilter(
    req.query,
    req.body
    );
  sendResponse(message, code, res);
}

function getTopprice(req, res) {
  const {message, code} = services.getTopprice();
  sendResponse(message, code, res);
}

function postTopprice(req, res) {
  const {message, code} = services.postTopprice(req.body);
    sendResponse(message, code, res);
}

function getCommonprice(req, res) {
  const {message, code} = services.getCommonprice();
  sendResponse(message, code, res);
}

function postCommonprice(req, res) {
  const {message, code} = services.postCommonprice(req.body);
  sendResponse(message, code, res);
}

function postData(req, res) {
  const {message, code} = services.postData(req.body);
  sendResponse(message, code, res);
}

function notFound(req, res) {
  const { message, code } = services.notFound();
  sendResponse(message, code, res);
}

function getArrayWithDiscountPromise(req, res) {
  services.getArrayWithDiscountPromise()
  .then(({message, code}) => {
    sendResponse(message, code, res);
  })
  .catch(error => {
    sendResponse({error: error.message}, badRequest, res);
  });
}

function postArrayWithDiscountPromise(req, res) {
  services.postArrayWithDiscountPromise(req.body)
  .then(({message, code}) => {
    sendResponse(message, code, res);
  })
  .catch(error => {
    sendResponse({error: error.message}, badRequest, res);
  });
}

function getArrayWithDiscountPromisify(req, res) {
  services.getArrayWithDiscountPromisify()
  .then(({message, code}) => {
    sendResponse(message, code, res);
  })
  .catch(error => {
    sendResponse({error: error.message}, badRequest, res);
  });
}

function postArrayWithDiscountPromisify(req, res) {
  services.postArrayWithDiscountPromisify(req.body)
  .then(({message, code}) => {
    sendResponse(message, code, res);
  })
  .catch(error => {
    sendResponse({error: error.message}, badRequest, res);
  });
}

async function getArrayWithDiscountAsync(req, res) {
  try {
    const {message, code} = await services.getArrayWithDiscountAsync();
    sendResponse(message, code, res);
  }
  catch(error) {
    sendResponse({error: error.message}, badRequest, res);
  };
}

async function postArrayWithDiscountAsync(req, res) {
  try {
    const {message, code} = await services
      .postArrayWithDiscountAsync(req.body);
    sendResponse(message, code, res);
  }
  catch(error) {
    sendResponse({error: error.message}, badRequest, res);
  };
}

async function uploadCsv(req, res) {
  try {
    const {message, code} = await services.uploadDataCsv(req);
    sendResponse(message, code, res);
  }
  catch(error) {
    sendResponse({error: error.message}, badRequest, res);
  };

};

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
  getArrayWithDiscountPromise,
  postArrayWithDiscountPromise,
  getArrayWithDiscountPromisify,
  postArrayWithDiscountPromisify,
  getArrayWithDiscountAsync,
  postArrayWithDiscountAsync,
  uploadCsv
};
