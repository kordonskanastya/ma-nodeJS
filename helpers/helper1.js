const goodsSort = (goodsArray, item, value) => {
  const filteredArray = goodsArray.filter(obj => obj[item] === value);
  return filteredArray;
};

module.exports = goodsSort;
