const searchFruitByItem = (goodsArray, item, value) => {
  const filteredArray = goodsArray.filter(obj => {
    if (Number(value)) {
      return obj[item] === Number(value);
    }
    return obj[item] === value;
  });
  return filteredArray;
};

module.exports = searchFruitByItem;

