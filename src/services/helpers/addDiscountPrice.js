const { formatPriceToNumber } = require('./utils');

module.exports = (discount, fruitsArray) => fruitsArray.map(fruit => {
    const pricePerQuantity = fruit.pricePerKilo || fruit.pricePerItem;
    const weightOfFruit = fruit.weight || fruit.quantity;
    const discountPrice = (formatPriceToNumber(pricePerQuantity)
      *
      weightOfFruit
      *
      (100 - discount) / 100).toFixed(2);
    return { ...fruit, discountPrice };
  });
