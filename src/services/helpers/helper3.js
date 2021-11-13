function formatPriceToNumber(price) {
  return price.replace('$', '').replace(',', '.');
}

const addTotalPriceOfFruit = (obj) => {
  const pricePerQuantity = obj.pricePerKilo || obj.pricePerItem;
  const weightOfFruit = obj.weight || obj.quantity;
  const price = formatPriceToNumber(pricePerQuantity)
    *
    weightOfFruit;
  return { ...obj, price};
};

const addKeyPrice = (data) => data.map(addTotalPriceOfFruit);

module.exports = {
  addKeyPrice,
  formatPriceToNumber,
};

// module.exports = (products) => {};
