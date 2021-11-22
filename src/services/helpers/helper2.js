const data = require('../../data.json');
const {formatPriceToNumber:formatter} = require('./utils');

const compare = (a, b) => {
  const pricePerQuantityA = a.pricePerKilo || a.pricePerItem;
  const weightOfFruitA = a.weight || a.quantity;
  const priceA = formatter(pricePerQuantityA)
    * weightOfFruitA;

  const pricePerQuantityB = b.pricePerKilo || b.pricePerItem;
  const weightOfFruitB = b.weight || b.quantity;
  const priceB = formatter(pricePerQuantityB)
    * weightOfFruitB;

  return priceA - priceB;
};

const mostExpensiveFruit = (goodsArray = data) => {
  const filteredArray = goodsArray.sort(compare);
  return filteredArray[filteredArray.length - 1];
};

module.exports = mostExpensiveFruit;


// module.exports = (sourceProducts) => {};
