const product = require('./product');
const discounts = require('./discounts');
const filter = require('./filter');
const topprice = require('./topprice');
const commonPrice = require('./commonPrice');
const order = require('./order');
const data = require('./data');

module.exports = {
  ...data,
  ...filter,
  ...topprice,
  ...commonPrice,
  ...discounts,
  ...product,
  ...order
};
