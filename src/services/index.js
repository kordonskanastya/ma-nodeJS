const data = require('./data.json');
const {
  helper1:searchFruitByItem,
  helper2:mostExpensiveFruit,
  helper3:addKeyPrice,
  validator
} = require('./helpers/index');

function home() {
  return {
    code: 200,
    message: 'hello world',
  };
}

function error() {
  return {
    message: 'Error: no content',
    code: 204,
  };
}

function getFilter(params) {
  const goodsArray = data;
  let sortedArray = searchFruitByItem(goodsArray);
  // eslint-disable-next-line no-restricted-syntax
  for (const key of params.keys()) {
    sortedArray = searchFruitByItem(sortedArray, key, params.get(key));
  }
   if (Object.keys(sortedArray).length === 0) {
    return error();
   }
  return {
    message: sortedArray,
    code: 200,
  };
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
   if (Object.keys(sortedArray).length === 0) {
    return error();
   }
  return {
    message: sortedArray,
    code: 200,
  };
}

function getTopprice() {
  const goodsArray = data;
  return {
    message: mostExpensiveFruit(goodsArray),
    code: 200,
  };
}

function postTopprice(serverGoodsArray) {
  if (!validator(serverGoodsArray)) {
    return error();
  }
  return {
    message: mostExpensiveFruit(serverGoodsArray),
    code: 200,
  };
}

function getCommonprice() {
  const goodsArray = data;
  return {
    message: addKeyPrice(goodsArray),
    code: 200,
  };
}

function postCommonprice(serverGoodsArray) {
  if (!validator(serverGoodsArray)) {
    return error();
  }
  return {
    message: addKeyPrice(serverGoodsArray),
    code: 200,
  };
}

function notFound() {
  return {
    code: 404,
    message: 'page not found',
  };
}

module.exports = {
  home,
  notFound,
  getFilter,
  postFilter,
  getTopprice,
  postTopprice,
  getCommonprice,
  postCommonprice
};
