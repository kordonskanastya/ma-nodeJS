const { formatPriceToNumber } = require('./utils');
const discount = require('./discount');

function createDiscountPromise() {
  return new Promise((resolve, reject) => {
      discount((err, disc) => {
      if(err) {
        console.log(err);
        return reject(err);
      }
      console.log(disc);
      return resolve(disc);
    });
  });

}

function addDiscountKey(obj) {
  const pricePerQuantity = obj.pricePerKilo || obj.pricePerItem;
  const weightOfFruit = obj.weight || obj.quantity;
  const discont = Promise.all(createDiscountPromise())
  .then((disc) => {
    console.log(disc);
    return disc;
  })
  .catch(() => {
    createDiscountPromise()
    .then((disc) => {
      console.log(disc);
      return disc;
    })
    .catch((err) => err);
  });
  const discountPrice = formatPriceToNumber(pricePerQuantity)
    *
    weightOfFruit
    *
    (100 - discont) / 100;
  return { ...obj, discountPrice};
};

module.exports = (goodsArray) => goodsArray.map(addDiscountKey);
