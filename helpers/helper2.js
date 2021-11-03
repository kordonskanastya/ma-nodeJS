const data = require('../data.json');

const mostExpensiveFruit = (goodsArray = data) => {
    const compare = (a, b) => {
      const firstPrice = a[Object.keys(a)[3]]
        .replace(/,/gi, '.').slice(1)
      *
      a[Object.keys(a)[2]];
      const secondPrice = b[Object.keys(b)[3]]
        .replace(/,/gi, '.').slice(1)
      *
      b[Object.keys(b)[2]];
      return firstPrice - secondPrice;
    };
  const filteredArray = goodsArray.sort(compare);
  return filteredArray[filteredArray.length - 1];
};

console.log(mostExpensiveFruit());

module.exports = mostExpensiveFruit;
