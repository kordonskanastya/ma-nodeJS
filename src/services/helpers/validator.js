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
    const typeType = (typeof type) === 'string';
    const typeWeight = (typeof weight) === 'number';
    const typePrice = ((typeof price) === 'string')
    &&
    (price.startsWith('$'))
    &&
    ((typeof parseFloat(price.slice(1))) === 'number');
    return typeItem && typeType && typeWeight && typePrice;
  };
  const validateData = goodsArray.filter(check);
  if (goodsArray.length !== validateData.length) {
    return false;
  }
  return true;
};

module.exports = validator;
