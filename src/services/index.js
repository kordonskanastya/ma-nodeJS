const discounts = require('./discounts');
const filter = require('./filter');
const topprice = require('./topprice');
const commonPrice = require('./commonPrice');
const data = require('./data');

module.exports = {
  ...data,
  ...filter,
  ...topprice,
  ...commonPrice,
  ...discounts,
};
