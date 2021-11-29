const util = require('util');
const addDiscountPrice = require('./addDiscountPrice');
const randomDiscount = require('./discount');

function createDiscountPromise(goodsArray) {
  return new Promise((resolve) => {
    // eslint-disable-next-line consistent-return
    function discountCallback(err, disc) {
      if (err) {
        return randomDiscount(discountCallback);
      }
      const fruitsWithDiscount = addDiscountPrice(disc, goodsArray);
      resolve(fruitsWithDiscount);
    }
    randomDiscount(discountCallback);
  });
}


module.exports = createDiscountPromise;
