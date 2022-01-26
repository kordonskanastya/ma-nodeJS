const { successMessage } = require('../utils');
const productService = require('./CRUD/product');
const { helper3: addKeyPrice, validator } = require('./helpers/index');

async function getCommonprice() {
  const dbData = await productService.getAllProducts();
  return successMessage(addKeyPrice(dbData));
}

function postCommonprice(serverGoodsArray) {
  if (!validator(serverGoodsArray)) {
    throw new Error('Not Acceptable');
  }
  return successMessage(addKeyPrice(serverGoodsArray));
}

module.exports =
{
  getCommonprice,
  postCommonprice
};
