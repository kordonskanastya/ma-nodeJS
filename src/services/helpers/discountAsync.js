const addDiscountPrice = require('./addDiscountPrice');
const randomDiscount = require('./discount');

async function createDiscountPromise(goodsArray) {

  const discount = await new Promise((resolve) => {
    // eslint-disable-next-line consistent-return
    function discountCallback(err, disc) {
      if (err) {
        return randomDiscount(discountCallback);
      }
      resolve(disc);
    }
    randomDiscount(discountCallback);
  });

  const fruitsWithDiscount = addDiscountPrice(discount, goodsArray);
  return fruitsWithDiscount;
}

module.exports = createDiscountPromise;
