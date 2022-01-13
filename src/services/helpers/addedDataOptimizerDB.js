const db = require('../../db');

async function dataOptimizerDB (obj) {
  const similarProduct = await db.getProductByTypeAndPrice(
    obj.type, obj.pricevalue);
  if (similarProduct === undefined || similarProduct === null) {
    await db.createProduct(obj);
  } else {
    await db.updateProduct({
      id: similarProduct.id,
      ...{
        item: similarProduct.item,
        type: similarProduct.type,
        measure: similarProduct.measure,
        measurevalue: similarProduct.measurevalue + obj.measurevalue,
        pricetype: similarProduct.pricetype,
        pricevalue: similarProduct.pricevalue
      }
    });
  }
}

module.exports = dataOptimizerDB;
