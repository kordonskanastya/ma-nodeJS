// const data = require('./helpers/data.json');
const {
  helper1:searchFruitByItem,
  helper2:mostExpensiveFruit,
  helper3:addKeyPrice
} = require('./helpers/index');

function home() {
  return {
    code: 200,
    message: 'hello world',
  };
}

function filter() {
  return {
    searchFruitByItem,
    code: 200,
  };
}

function topprice() {
  return {
    mostExpensiveFruit,
    code: 200,
  };
}

function commonprice() {
  return {
    addKeyPrice,
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
  filter,
  topprice,
  commonprice
};
