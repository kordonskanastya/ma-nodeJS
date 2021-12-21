const searchFruitByItem = (goodsArray, item, value) => {
  const filteredArray = goodsArray.filter(obj => obj[item] === value);
  return filteredArray;
};

module.exports = searchFruitByItem;

