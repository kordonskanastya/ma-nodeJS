const data = require('../data.json');

const mostExpensiveFruit = (goodsArray = require('../data.json')) => {
    const compare = (a, b) => {
      const firstPrice = a[Object.keys(a)[Object.keys(a).length - 1]]
        .replace(/,/gi, '.').slice(1)
      *
      a[Object.keys(a)[Object.keys(a).length - 2]];
      const secondPrice = b[Object.keys(b)[Object.keys(b).length - 1]]
        .replace(/,/gi, '.').slice(1)
      *
      b[Object.keys(b)[Object.keys(b).length - 2]];
      return firstPrice - secondPrice;
    };
  const filteredArray = goodsArray.sort(compare);
  return filteredArray[filteredArray.length - 1];
};

module.exports = mostExpensiveFruit(data);
