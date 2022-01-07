const config = require('../config');

const { db: dbConfig } = config;
const db = require('../db')(dbConfig);
const statusCode = require('../statusCode');
const {
  helper1:searchFruitByItem,
  helper2:mostExpensiveFruit,
  helper3:addKeyPrice,
  validator,
  addKeyDiscountPromise,
  addKeyDiscountPromisify,
  uploadCsv
} = require('./helpers/index');

let data;

(async () => {
    try {
    data = await db.getAllData();
  } catch(err) {
    console.error(err.message || err);
    throw err;
  }
})();

function successMessage(functionMessage) {
  return {
    code: statusCode.ok,
    message: functionMessage,
  };
}

function getHomePage() {
  return successMessage({'result': 'hello world!'});
}

function getFilter(params) {
  let sortedArray = data;
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

function getTopprice() {
  return successMessage(mostExpensiveFruit(data));
}

function postTopprice(serverGoodsArray) {
  if (!validator(serverGoodsArray)) {
    throw new Error('Not Acceptable');
  }
  return successMessage(mostExpensiveFruit(serverGoodsArray));
}

function getCommonprice() {
  return successMessage(addKeyPrice(data));
}

function postCommonprice(serverGoodsArray) {
  if (!validator(serverGoodsArray)) {
    throw new Error('Not Acceptable');
  }
  return successMessage(addKeyPrice(serverGoodsArray));
}

async function postData(serverGoodsArray) {
  if (!validator(serverGoodsArray)) {
    throw new Error('Not Acceptable');
  }
  try{
    await db.cleanTable();
    // eslint-disable-next-line no-restricted-syntax
    for (const obj of serverGoodsArray) {
      // eslint-disable-next-line no-await-in-loop
      await db.createProduct(obj);
    }
  } catch (err) {
    console.log(err);
    throw new Error('Unable to write file');
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
      reject(new Error('Not Acceptable'));
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
      reject(new Error('Not Acceptable'));
    }
    addKeyDiscountPromisify(serverGoodsArray).then((fruitWithDiscount) => {
      resolve(successMessage(fruitWithDiscount));
    });
  });
}

async function getArrayWithDiscountAsync(){
  const arrayWithDiscount = await addKeyDiscountPromise(data);
  return successMessage(arrayWithDiscount);
}

async function postArrayWithDiscountAsync(serverGoodsArray){
  if (!validator(serverGoodsArray)) {
    throw new Error('Not Acceptable');
  }
  const arrayWithDiscount = await addKeyDiscountPromise(serverGoodsArray);
  return successMessage(arrayWithDiscount);
}

async function uploadDataCsv(req) {
  try{
    await uploadCsv(req);
    return successMessage({result: 'CSV file convert to JSON'});
  } catch (err) {
    console.log('Can not convert csv to JSON in helpers', err);
    throw new Error('Can not convert csv to JSON');
  }
}

async function allProducts(){
  const dbData = await db.getAllData();
  return successMessage(dbData);
}

async function productGet(req){
  const productById = await db.getProduct(Number(req.params.id));
  return successMessage(productById);
}

async function productCreate(req){
  if (!validator([req.body])) {
    throw new Error('Not Acceptable');
  }
  const newProduct = await db.createProduct(req.body);
  return successMessage(newProduct);
}

async function productUpdate(req){
  if (!validator([req.body])) {
    throw new Error('Not Acceptable');
  }
  const updatedProduct = await db.updateProduct(
    {id: Number(req.params.id), ...req.body}
  );
  return successMessage(updatedProduct);
}

async function productDelete(req){
  const deletedProduct = await db.deleteProduct(Number(req.params.id));
  return successMessage(deletedProduct);
}

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
  uploadDataCsv,
  allProducts,
  productGet,
  productCreate,
  productUpdate,
  productDelete
};
