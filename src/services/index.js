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
  getHomePage,
  postData,
  uploadDataCsv
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
  uploadDataCsv
};
