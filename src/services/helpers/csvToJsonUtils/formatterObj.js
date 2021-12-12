const {formatPriceToNumber} = require('../utils');

function formatterObj(jsonObjects) {
  const formattedArr = [];

  jsonObjects.forEach((obj) => {
    const formattedObj = {};
    formattedObj.item = obj.item;
    formattedObj.type = obj.type;

    if (obj.measure === 'quantity') {
      formattedObj.quantity = obj.measureValue;
    } else if (obj.measure === 'weight') {
      formattedObj.weight = obj.measureValue;
    }

    if (obj.priceType === 'pricePerItem') {
      formattedObj.pricePerItem = formatPriceToNumber(obj.priceValue);
    } else if (obj.priceType === 'pricePerKilo') {
      formattedObj.pricePerKilo = formatPriceToNumber(obj.priceValue);
    }

    formattedArr.push(formattedObj);
  });

  return formattedArr;
}

module.exports = formatterObj;
