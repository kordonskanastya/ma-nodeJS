const addKeyPrice = require('./helper3');

const pineapple = 'pineapple';
const redSpanish = 'Red Spanish';
const orange = 'orange';
const tangerine = 'Tangerine';

module.exports = (discount, fruitsArray) => addKeyPrice(fruitsArray)
  .map(fruit => {
    let discountPrice;
    if(fruit.item === pineapple && fruit.type === redSpanish) {
      discountPrice = fruit.price - (fruit.price * (discount * 2)) / 100;
    } else if(fruit.item === orange && fruit.type === tangerine) {
      discountPrice = fruit.price - (fruit.price * (discount * 3)) / 100;
    } else {
      discountPrice = (fruit.price * (100 - discount) / 100);
    }
    return { ...fruit, priceWithDiscount: parseInt(discountPrice, 10) };
  });
