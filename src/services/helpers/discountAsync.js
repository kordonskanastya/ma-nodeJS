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



// const o = {pricePerKilo:'$4', weight: 10};

// console.log(forMap(o));

// module.exports = (goods, callback) => {
//   callback((goods).map(forMap));
// };

module.exports = async (obj, callback) => {
  const discont = await createDiscountPromise();
  const pricePerQuantity = obj.pricePerKilo || obj.pricePerItem;
  const weightOfFruit = obj.weight || obj.quantity;
  const discountPrice = (formatPriceToNumber(pricePerQuantity)
    *
    weightOfFruit
    *
    (100 - discont) / 100).toFixed(2);
  console.log('\n', 'in export:', { ...obj, discountPrice}, '\n');
  callback({ ...obj, discountPrice });

};
