const { formatPriceToNumber } = require('./utils');
const randomDiscount = require('./discount');

function createDiscountPromise(goodsArray) {

  // eslint-disable-next-line arrow-body-style
  const addDiscountPrice = (discount, fruitsArray) => {
    return fruitsArray.map(fruit => {
      const pricePerQuantity = fruit.pricePerKilo || fruit.pricePerItem;
      const weightOfFruit = fruit.weight || fruit.quantity;
      const discountPrice = (formatPriceToNumber(pricePerQuantity)
        *
        weightOfFruit
        *
        (100 - discount) / 100).toFixed(2);
      return { ...fruit, discountPrice };
    });
    // return fruitsArray;
  };

  return new Promise((resolve) => {
    function discountCallback(err, disc) {
      if (err) {
        randomDiscount(discountCallback);
      }
      const fruitsWithDiscount = addDiscountPrice(disc, goodsArray);
      console.log(fruitsWithDiscount);
      resolve(fruitsWithDiscount);
    }

    randomDiscount(discountCallback);
  });
}


module.exports = createDiscountPromise;
