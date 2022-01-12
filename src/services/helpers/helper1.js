const searchFruitByItem = (goodsArray, item, value) => {
  const filteredArray = goodsArray.filter(obj => {
    if (parseInt(value, 10)) {
      return obj[item] === parseInt(value, 10);
    }
    return obj[item] === value;
  });
  return filteredArray;
};

module.exports = searchFruitByItem;

