const { formatPriceToNumber } = require('./utils');
const discount = require('./discount');


function createDiscountPromise() {
  return new Promise((resolve) => {
      discount((err, disc) => {
      if(err) {
        return resolve(createDiscountPromise());
      }
      return resolve(disc);
    });
  });

}

module.exports = (goodsArray) => goodsArray.map((obj) => {
  let res = {};
  createDiscountPromise()
  .then((disc) => {
    console.log(disc, 'then');
    const pricePerQuantity = obj.pricePerKilo || obj.pricePerItem;
    const weightOfFruit = obj.weight || obj.quantity;
    const discountPrice = formatPriceToNumber(pricePerQuantity)
      *
      weightOfFruit
      *
      (100 - disc) / 100;
    console.log('discont price', discountPrice);
    res = { ...obj, discountPrice};
    console.log('\n', res, '\n');
  });
  return res;
});
