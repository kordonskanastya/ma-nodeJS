const services = require('../../services');
const { badRequest } = require('../../statusCode');

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductIfExists
} = require('./productCRUD');

const {
  getArrayWithDiscountPromise,
  postArrayWithDiscountPromise,
  getArrayWithDiscountPromisify,
  postArrayWithDiscountPromisify,
  getArrayWithDiscountAsync,
  postArrayWithDiscountAsync
} = require('./discounts');

const {
  getFilter,
  postFilter
} = require('./filter');

const {
  getTopprice,
  postTopprice
} = require('./topprice');

const {
  getCommonprice,
  postCommonprice
} = require('./commonPrice');

const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrderIfExists
} = require('./orderCRUD');


function getHomePage(req, res) {
  const { message, code } = services.getHomePage();
  res.status(code).send(message);
}

function postData(req, res) {
  services.postData(req.body).then((result) => {
    const {message, code} = result;
    res.status(code).send(message);
  });
}

// eslint-disable-next-line consistent-return
async function uploadCsv(req, res) {
  try {
    if (req.headers['content-type'] !== 'text/csv') {
      throw new Error('invalid header type');
    }
    const {message, code} = await services.uploadDataCsv(req);
    res.status(code).send(message);
  }
  catch(error) {
    res.status(badRequest).send({error: error.message});
  };
};

module.exports = {
  getHomePage,
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
  uploadCsv,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductIfExists,
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrderIfExists
};
