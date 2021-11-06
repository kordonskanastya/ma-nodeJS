const data = require('../data.json');

const compare = (a, b) => {
  const pricePerQuantityA = a.pricePerKilo || a.pricePerItem;
  const weightOfFruitA = a.weight || a.quantity;
  const priceA = pricePerQuantityA.replace(',', '.').slice(1)
    * weightOfFruitA;

  const pricePerQuantityB = b.pricePerKilo || b.pricePerItem;
  const weightOfFruitB = b.weight || b.quantity;
  const priceB = pricePerQuantityB.replace(',', '.').slice(1)
    * weightOfFruitB;

  return priceA - priceB;
};

const mostExpensiveFruit = (goodsArray = data) => {
  const filteredArray = goodsArray.sort(compare);
  return filteredArray[filteredArray.length - 1];
};

module.exports = mostExpensiveFruit;
