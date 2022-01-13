const {formatPriceToNumber} = require('./utils');

const addTotalPriceOfFruit = (obj) => {
  const price = formatPriceToNumber(obj.pricevalue)
    *
    obj.measurevalue;
  const returnedObj = obj.dataValues || obj;
  return { ...returnedObj, price};
};

const addKeyPrice = (data) => data.map(addTotalPriceOfFruit);

module.exports = addKeyPrice;

