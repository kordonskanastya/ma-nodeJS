const {formatPriceToNumber:formatter} = require('./utils');

const compare = (a, b) => {
  const priceA = formatter(a.pricevalue)
    * a.measurevalue;

  const priceB = formatter(b.pricevalue)
    * b.measurevalue;

  return priceA - priceB;
};

const mostExpensiveFruit = (goodsArray) => {
  const filteredArray = goodsArray.sort(compare);
  return filteredArray[filteredArray.length - 1];
};

module.exports = mostExpensiveFruit;


// module.exports = (sourceProducts) => {};
