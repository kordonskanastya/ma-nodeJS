const fs = require('fs');
const path = require('path');
const data = require('../data.json');
const statusCode = require('../statusCode');
const {
  helper1:searchFruitByItem,
  helper2:mostExpensiveFruit,
  helper3:addKeyPrice,
  validator,
  addKeyDiscountPromise,
  addKeyDiscountPromisify,
  addKeyDiscountAsync
} = require('./helpers/index');

function successMessage(functionMessage) {
  return {
    code: statusCode.ok,
    message: functionMessage,
  };
}

function error(errorCode, errorMessage) {
  return {
    message: errorMessage,
    code: errorCode
  };
}

function getHomePage() {
  return successMessage({'result': 'hello world!'});
}

function getFilter(params) {
  let sortedArray = searchFruitByItem(data);
  // eslint-disable-next-line no-restricted-syntax
  for (const key of params.keys()) {
    sortedArray = searchFruitByItem(sortedArray, key, params.get(key));
  }
   if (sortedArray.length === 0) {
    return error(statusCode.notFound, {'error': 'Not found'});
   }
  return successMessage(sortedArray);
}

function postFilter(params, serverGoodsArray) {
  if (!validator(serverGoodsArray)) {
    return error(statusCode.notAcceptable, {'error':'Not Acceptable'});
  }
  let sortedArray = searchFruitByItem(serverGoodsArray);
  // eslint-disable-next-line no-restricted-syntax
  for (const key of params.keys()) {
    sortedArray = searchFruitByItem(sortedArray, key, params.get(key));
  }
   if (sortedArray.length === 0) {
    return error(statusCode.notFound, {'error': 'Not found'});
   }
   return successMessage(sortedArray);
}

function getTopprice() {
  return successMessage(mostExpensiveFruit(data));
}

function postTopprice(serverGoodsArray) {
  if (!validator(serverGoodsArray)) {
    return error(statusCode.notAcceptable, {'error':'Not Acceptable'});
  }
  return successMessage(mostExpensiveFruit(serverGoodsArray));
}

function getCommonprice() {
  return successMessage(addKeyPrice(data));
}

function postCommonprice(serverGoodsArray) {
  if (!validator(serverGoodsArray)) {
    return error(statusCode.notAcceptable, {'error':'Not Acceptable'});
  }
  return successMessage(addKeyPrice(serverGoodsArray));
}

function postData(serverGoodsArray) {
  if (!validator(serverGoodsArray)) {
    return error(statusCode.notAcceptable, {'error':'Not Acceptable'});
  }
  const dataPath = path.join(__dirname, '../data.json');
  try{
    fs.writeFileSync(dataPath, JSON.stringify(serverGoodsArray));
  } catch (err) {
    console.log(err);
    return error(statusCode.badRequest, {'error':'Unable to write file'});
  }

  return successMessage({'result': 'rewritten data.json'});
}

function getArrayWithDiscountPromise(){
  return new Promise((resolve) => {
    addKeyDiscountPromise(data).then((fruitWithDiscount) => {
      resolve(successMessage(fruitWithDiscount));
    });
  });
}

function postArrayWithDiscountPromise(serverGoodsArray){
  return new Promise((resolve, reject) => {
    if (!validator(serverGoodsArray)) {
      reject(error(statusCode.notAcceptable, {'error':'Not Acceptable'}));
    }
    addKeyDiscountPromise(serverGoodsArray).then((fruitWithDiscount) => {
      resolve(successMessage(fruitWithDiscount));
    });
  });
}

function getArrayWithDiscountPromisify(){
  return new Promise((resolve) => {
    addKeyDiscountPromisify(data).then((fruitWithDiscount) => {
      resolve(successMessage(fruitWithDiscount));
    });
  });
}

function postArrayWithDiscountPromisify(serverGoodsArray){
  return new Promise((resolve, reject) => {
    if (!validator(serverGoodsArray)) {
      reject(error(statusCode.notAcceptable, {'error':'Not Acceptable'}));
    }
    addKeyDiscountPromisify(serverGoodsArray).then((fruitWithDiscount) => {
      resolve(successMessage(fruitWithDiscount));
    });
  });
}

async function getArrayWithDiscountAsync(){
  const arrayWithDiscount = await addKeyDiscountAsync(data);
  return successMessage(arrayWithDiscount);
}

async function postArrayWithDiscountAsync(serverGoodsArray){
  if (!validator(serverGoodsArray)) {
    return error(statusCode.notAcceptable, {'error':'Not Acceptable'});
  }
  const arrayWithDiscount = await addKeyDiscountAsync(data);
  return successMessage(arrayWithDiscount);
}

function notFound() {
  return error(statusCode.notFound, {'error':'Not found'});
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
  getArrayWithDiscountPromise,
  postArrayWithDiscountPromise,
  getArrayWithDiscountPromisify,
  postArrayWithDiscountPromisify,
  getArrayWithDiscountAsync,
  postArrayWithDiscountAsync
};
