const util = require('util');
const addDiscountPrice = require('./addDiscountPrice');
const randomDiscount = require('./discount');

function createDiscountPromisify(goodsArray) {
  return new Promise((resolve) => {
    const discount = util.promisify(randomDiscount);
    discount()
      .then((disc) => resolve(addDiscountPrice(disc, goodsArray)))
      .catch(() => createDiscountPromisify());
  });
}

module.exports = createDiscountPromisify;
