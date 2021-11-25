const { formatPriceToNumber } = require('./utils');
const discount = require('./discount');

function createDiscountPromise() {
  return new Promise((resolve, reject) => {
      discount((err, disc) => {
      if(err) {
        console.log(err);
        return reject(err);
      }
      return resolve(disc);
    });
  });

}

function discont() {
  createDiscountPromise()
.then((disc) => {
  console.log(disc, 'first try');
  return disc;
})
.catch(() => {
  createDiscountPromise()
  .then((disc) => {
    console.log(disc, 'second try');
    return disc;
  })
  .catch((err) => err);
});
}

function addDiscountKey(obj) {
  const pricePerQuantity = obj.pricePerKilo || obj.pricePerItem;
  const weightOfFruit = obj.weight || obj.quantity;
  const discountPrice = formatPriceToNumber(pricePerQuantity)
    *
    weightOfFruit
    *
    (100 - discont()) / 100;
  return { ...obj, discountPrice};
  };




module.exports = (goodsArray) => goodsArray.map(addDiscountKey);
