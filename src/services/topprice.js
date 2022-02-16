const { successMessage } = require('../utils');
const productService = require('./crud/product');
const { helper2: mostExpensiveFruit } = require('./helpers/index');

async function getTopprice() {
  return successMessage(mostExpensiveFruit(await productService
    .getAllProducts()));
}

function postTopprice(serverGoodsArray) {
  return successMessage(mostExpensiveFruit(serverGoodsArray));
}

module.exports =
{
  getTopprice,
  postTopprice
};
