const productService = require('../product');

async function dataOptimizerDB (obj) {
  const similarProduct = await productService.getProductByTypeAndPrice(
    obj.type, obj.pricevalue);
  if (similarProduct === undefined || similarProduct === null) {
    await productService.createProduct(obj);
  } else {
    await productService.updateProduct({
      id: similarProduct.id,
      item: similarProduct.item,
      type: similarProduct.type,
      measure: similarProduct.measure,
      measurevalue: similarProduct.measurevalue + obj.measurevalue,
      pricetype: similarProduct.pricetype,
      pricevalue: similarProduct.pricevalue
    });
  }
}

module.exports = dataOptimizerDB;
