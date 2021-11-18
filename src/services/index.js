const fs = require('fs');
const path = require('path');
const data = require('../data.json');
const {
  helper1:searchFruitByItem,
  helper2:mostExpensiveFruit,
  helper3:addKeyPrice,
  validator
} = require('./helpers/index');

function successMessage(functionMessage) {
  return {
    code: 200,
    message: functionMessage,
  };
}

function error() {
  return {
    message: 'Error',
    code: 404,
  };
}

function getHomePage() {
  return successMessage('hello world!');
}

function getFilter(params) {
  let sortedArray = searchFruitByItem(data);
  // eslint-disable-next-line no-restricted-syntax
  for (const key of params.keys()) {
    sortedArray = searchFruitByItem(sortedArray, key, params.get(key));
  }
   if (sortedArray.length === 0) {
    return error();
   }
  return successMessage(sortedArray);
}

function postFilter(params, serverGoodsArray) {
  if (!validator(serverGoodsArray)) {
    return error();
  }
  let sortedArray = searchFruitByItem(serverGoodsArray);
  // eslint-disable-next-line no-restricted-syntax
  for (const key of params.keys()) {
    sortedArray = searchFruitByItem(sortedArray, key, params.get(key));
  }
   if (sortedArray.length === 0) {
    return error();
   }
   return successMessage(sortedArray);
}

function getTopprice() {
  return successMessage(mostExpensiveFruit(data));
}

function postTopprice(serverGoodsArray) {
  if (!validator(serverGoodsArray)) {
    return error();
  }
  return successMessage(mostExpensiveFruit(serverGoodsArray));
}

function getCommonprice() {
  return successMessage(addKeyPrice(data));
}

function postCommonprice(serverGoodsArray) {
  if (!validator(serverGoodsArray)) {
    return error();
  }
  return successMessage(addKeyPrice(serverGoodsArray));
}

async function postData(serverGoodsArray) {
  if (!validator(serverGoodsArray)) {
    return error();
  }
  console.log(serverGoodsArray);
  const dataPath = path.join(__dirname, '../data.json');
  const res = await fs.writeFile(dataPath, JSON.stringify(serverGoodsArray));
  if(res){
    return successMessage('rewritten data.json');
  }
  return error();
}

function notFound() {
  return error();
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
