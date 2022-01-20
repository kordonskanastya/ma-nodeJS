/* eslint-disable no-await-in-loop */
const productService = require('./product');
const statusCode = require('../statusCode');
const dataOptimizerDB = require('./helpers/addedDataOptimizerDB');
const {
  helper1:searchFruitByItem,
  helper2:mostExpensiveFruit,
  helper3:addKeyPrice,
  validator,
  addKeyDiscountPromise,
  addKeyDiscountPromisify,
  uploadCsv
} = require('./helpers/index');


function successMessage(functionMessage) {
  return {
    code: statusCode.ok,
    message: functionMessage,
  };
}

function getHomePage() {
  return successMessage({'result': 'hello world!'});
}

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

async function postData(serverGoodsArray) {
  if (!validator(serverGoodsArray)) {
    throw new Error('Not Acceptable');
  }
  try{
    // eslint-disable-next-line no-restricted-syntax
    for (const obj of serverGoodsArray) {
      await dataOptimizerDB(obj);
    }
  } catch (err) {
    console.log(err);
    throw new Error('Unable to write file');
  }

  return successMessage({'result': 'rewritten data.json'});
}

async function getArrayWithDiscountPromise(){
  const data = await productService.getAllProducts();
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

async function getArrayWithDiscountPromisify(){
  const data = await productService.getAllProducts();
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
  const arrayWithDiscount = await addKeyDiscountPromise(
    await productService.getAllProducts());
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

async function getAllProducts(){
  const dbData = await productService.getAllProducts();
  return successMessage(dbData);
}

async function getProductById(req){
  const productById = await productService.getProduct(req.params.id);
  return successMessage(productById);
}

async function createProduct(req){
  if(!req.body) {
    await productService.createProduct(req);
    return true;
  }
  if (!validator([req.body])) {
    throw new Error('Not Acceptable');
  }
  const newProduct = await productService.createProduct(req.body);
  return successMessage(newProduct);
}

async function updateProduct(req){
  if(!req.body) {
    await productService.updateProduct(req);
    return true;
  }
  if (!validator([req.body])) {
    throw new Error('Not Acceptable');
  }
  const updatedProduct = await productService.updateProduct(
    {id: req.params.id, ...req.body}
  );
  return successMessage(updatedProduct);
}

async function deleteProductIfExists(req){
  const deletedProduct = await productService.deleteProduct(req.params.id);
  return successMessage(deletedProduct);
}

async function getProductByTypeAndPrice(item, measurevalue){
  const productByTypeAndPrice = await productService
    .getProductByTypeAndPrice(item, measurevalue);
  return productByTypeAndPrice;
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
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductIfExists,
  getProductByTypeAndPrice
};
