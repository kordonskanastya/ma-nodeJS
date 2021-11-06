const addTotalPriceOfFruit = (obj) => {
  const pricePerQuantity = obj.pricePerKilo || obj.pricePerItem;
  const weightOfFruit = obj.weight || obj.quantity;
  const price = pricePerQuantity.replace(',', '.').slice(1)
    *
    weightOfFruit;
  return { ...obj, price};;
};

const addKeyPrice = (data) => data.map(addTotalPriceOfFruit);

module.exports = addKeyPrice;
