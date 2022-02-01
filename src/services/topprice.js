const { successMessage } = require('../utils');
const productService = require('./crud/product');
const { helper2: mostExpensiveFruit, validator } = require('./helpers/index');

async function getTopprice() {
  return successMessage(mostExpensiveFruit(await productService
    .getAllProducts()));
}

function postTopprice(serverGoodsArray) {
  if (!validator(serverGoodsArray)) {
    throw new Error('Not Acceptable');
  }
  return successMessage(mostExpensiveFruit(serverGoodsArray));
}

module.exports =
{
  getTopprice,
  postTopprice
};
