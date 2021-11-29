const util = require('util');
const addDiscountPrice = require('./addDiscountPrice');
const randomDiscount = require('./discount');

function createDiscountPromisify(goodsArray) {

  const discount = util.promisify(randomDiscount);

  return new Promise((resolve) => {

    discount().then((disc) => {
    const fruitsWithDiscount = addDiscountPrice(disc, goodsArray);
    resolve(fruitsWithDiscount);
    })
    .catch(createDiscountPromisify(goodsArray));

  });

}


module.exports = createDiscountPromisify;
