const { formatPriceToNumber } = require('./utils');
const discount = require('./discount');

async function createDiscountPromise() {
  return new Promise((resolve) => {
      discount((err, disc) => {
      if(err) {
        return resolve(createDiscountPromise());
      }
      return resolve(disc);
    });
  });
}

async function forMap(obj) {
  const discont = await createDiscountPromise();
  const pricePerQuantity = obj.pricePerKilo || obj.pricePerItem;
  const weightOfFruit = obj.weight || obj.quantity;
  const discountPrice = (formatPriceToNumber(pricePerQuantity)
    *
    weightOfFruit
    *
    (100 - discont) / 100).toFixed(2);
  console.log('\n', 'in forMap:', { ...obj, discountPrice}, '\n');
  return { ...obj, discountPrice};
};

// const o = {pricePerKilo:'$4', weight: 10};

// console.log(forMap(o));

module.exports = (goods) => {
  (goods).map(forMap);
};
