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

function forMap(obj) {
    const pricePerQuantity = obj.pricePerKilo || obj.pricePerItem;
    const weightOfFruit = obj.weight || obj.quantity;
    return createDiscountPromise().then((disc) => {
      const discountPrice = (formatPriceToNumber(pricePerQuantity)
        *
        weightOfFruit
        *
        (100 - disc) / 100).toFixed(2);
      console.log('\n', { ...obj, discountPrice}, '\n');
      return { ...obj, discountPrice};
    });
  }

module.exports = (goods) => (goods).map(forMap);
