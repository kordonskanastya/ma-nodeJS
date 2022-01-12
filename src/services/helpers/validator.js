const validator = (goodsArray) => {
  const check = (currentObj) => {
    const {
      item,
      type,
      measure,
      measurevalue,
      pricetype,
      pricevalue
    } = currentObj;
    const typeItem = (typeof item) === 'string';
    const typeOfItemType = (typeof type) === 'string';
    const typeMeasure = (typeof measure) === 'string';
    const typeMeasureValue = (typeof measurevalue) === 'number';
    const typePriceType = (typeof pricetype) === 'string';
    const typePriceValue = ((typeof pricevalue) === 'string')
    &&
    (pricevalue.startsWith('$'))
    &&
    ((typeof parseFloat(pricevalue.slice(1))) === 'number');
    return typeItem && typeOfItemType && typeMeasure && typeMeasureValue &&
    typePriceType && typePriceValue;
  };
  const validateData = goodsArray.filter(check);
  return goodsArray.length === validateData.length;
};

module.exports = validator;
