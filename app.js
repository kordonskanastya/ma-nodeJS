const data = require('./data.json');
const {
  helper1:searchFruitByItem,
  helper2:mostExpensiveFruit,
  helper3:addKeyPrice
} = require('./helpers/index');

const boot = (goodsArray = data) => {
  console.log('Add price key for fruits: ', addKeyPrice(goodsArray, ));

  console.log('=================================');

  const resOrange = searchFruitByItem(goodsArray, 'item', 'orange');
  const resWeight4 = searchFruitByItem(goodsArray, 'weight', 4);
  console.log('Search oranges : ', resOrange);
  console.log('=================================');
  console.log('Search fruits with weight 4 : ', resWeight4);
  const unionArrays = resOrange.concat(resWeight4);

  const expensiveFruit = mostExpensiveFruit(unionArrays);
  console.log('Search most expensive fruit: ', expensiveFruit);
  console.log('=================================');

  unionArrays.push(expensiveFruit);

  console.log('Add price key for fruits: ', addKeyPrice(unionArrays));
  console.log('================================');

  console.log('Search most expensive fruit: ', mostExpensiveFruit());
};

boot(data);
