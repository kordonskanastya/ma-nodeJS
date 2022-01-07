const {formatPriceToNumber} = require('./utils');

const addTotalPriceOfFruit = (obj) => {
  const price = formatPriceToNumber(obj.pricevalue)
    *
    obj.measurevalue;
  return { ...obj, price};
};

const addKeyPrice = (data) => data.map(addTotalPriceOfFruit);

module.exports = addKeyPrice;

