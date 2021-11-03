const data = require('./data.json');
const {
  helper1:searchFruitByItem,
  helper2:mostExpensiveFruit,
  helper3:addKeyPrice
} = require('./helpers/index');

const boot = (goodsArray = data) => {
  console.log(addKeyPrice(goodsArray));

  const resOrange = searchFruitByItem(goodsArray, 'item', 'orange');
  const resWeight4 = searchFruitByItem(goodsArray, 'weight', 4);
  console.log(resOrange, resWeight4);
  const unionArrays = resOrange.concat(resWeight4);

  const expensiveFruit = mostExpensiveFruit(unionArrays);
  console.log(expensiveFruit);

  unionArrays.push(expensiveFruit);

  console.log(addKeyPrice(unionArrays));

  console.log(mostExpensiveFruit());
};

boot(data);
