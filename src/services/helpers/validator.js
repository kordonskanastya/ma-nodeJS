const validator = (goodsArray) => {
  const check = (currentObj) => {
    const {
      item,
      type,
      quantity,
      weight = quantity,
      pricePerKilo,
      pricePerItem : price = pricePerKilo
    } = currentObj;
    const typeItem = (typeof item) === 'string';
    const typeOfItemType = (typeof type) === 'string';
    const typeWeight = (typeof weight) === 'number';
    const typePrice = ((typeof price) === 'string')
    &&
    (price.startsWith('$'))
    &&
    ((typeof parseFloat(price.slice(1))) === 'number');
    return typeItem && typeOfItemType && typeWeight && typePrice;
  };
  const validateData = goodsArray.filter(check);
  return goodsArray.length === validateData.length;
};

module.exports = validator;
