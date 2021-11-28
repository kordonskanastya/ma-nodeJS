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

function addKeyDiscountPromise(obj) {
  return createDiscountPromise().then((disc) => {
    const pricePerQuantity = obj.pricePerKilo || obj.pricePerItem;
    const weightOfFruit = obj.weight || obj.quantity;
    const discountPrice = (formatPriceToNumber(pricePerQuantity)
      *
      weightOfFruit
      *
      (100 - disc) / 100).toFixed(2);
    // console.log('\n', { ...obj, discountPrice}, '\n');
    return { ...obj, discountPrice};
    });
  }

// const go = [
//   { "item": "apple", "type": "Fuji", "weight": 10, "pricePerKilo": "$3" },
//   { "item": "apple", "type": "Fuji", "weight": 10, "pricePerKilo": "$4" },
//   { "item": "apple", "type": "Fuji", "weight": 10, "pricePerKilo": "$5" }
// ];

// Promise.all((go).map(addKeyDiscountPromise)).then((res => console.log(res)));

module.exports = (goods) => Promise.all((goods).map(addKeyDiscountPromise));
