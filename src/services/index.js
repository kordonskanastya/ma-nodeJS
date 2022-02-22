const discounts = require('./discounts');
const filter = require('./filter');
const topprice = require('./topprice');
const commonPrice = require('./commonPrice');
const data = require('./data');
const login = require('./auth');
const delivery = require('./delivery');

module.exports = {
  ...data,
  ...filter,
  ...topprice,
  ...commonPrice,
  ...discounts,
  ...login,
  ...delivery,
};
