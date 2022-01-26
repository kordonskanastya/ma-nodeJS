const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductIfExists
} = require('./product');

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
} = require('./order');

const {
  getHomePage,
  postData,
  uploadCsv
} = require('./data');

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
