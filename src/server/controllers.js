const services = require('../services');
const data = require('../services/data.json');

function home(req, res) {
  const { message, code } = services.home();
  res.write(message);
  res.statusCode = code;
  res.end();
}

function filter(req, res) {
  // const { params } = req;
  const {code, searchFruitByItem} = services.filter();
  res.setHeader('Content-Type', 'application/json');
  // res.write(JSON.stringify(params));
  // console.log(params);
  res.write(JSON.stringify(searchFruitByItem(data)));
  res.statusCode = code;
  res.end();
}

function topprice(req, res) {
  const { code, mostExpensiveFruit } = services.topprice();
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(mostExpensiveFruit()));
  res.statusCode = code;
  res.end();
}

function commonprice(req, res) {
  const { code, addKeyPrice } = services.commonprice();
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(addKeyPrice(data)));
  res.statusCode = code;
  res.end();
}

function notFound(req, res) {
  const { message, code } = services.notFound();
  res.statusCode = code;
  res.write(message);
  res.end();
}

module.exports = {
  home,
  notFound,
  filter,
  topprice,
  commonprice
};
