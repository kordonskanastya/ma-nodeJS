const { successMessage } = require('../utils');
const productService = require('./CRUD/product');
const { helper1: searchFruitByItem, validator } = require('./helpers/index');

async function getFilter(params) {
  if (params.length === 0) {
    return successMessage(await productService.getAllProducts());
  }
  let sortedArray = await productService.getAllProducts();
  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(params)) {
    sortedArray = searchFruitByItem(sortedArray, key, params[key]);
  }
   if (sortedArray.length === 0) {
    throw new Error('Not found items');
   }
  return successMessage(sortedArray);
}

function postFilter(params, serverGoodsArray) {
  if (!validator(serverGoodsArray)) {
    throw new Error('Not Acceptable');
  }
  let sortedArray = serverGoodsArray;
  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(params)) {
    sortedArray = searchFruitByItem(sortedArray, key, params[key]);
  }
   if (sortedArray.length === 0) {
    throw new Error('Not found items');
   }
   return successMessage(sortedArray);
}

module.exports =
{
  getFilter,
  postFilter
};
