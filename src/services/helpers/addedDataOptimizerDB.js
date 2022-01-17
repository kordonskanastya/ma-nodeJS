async function dataOptimizerDB (obj) {
  // eslint-disable-next-line global-require
  const services = require('..');
  console.log(services);
  const similarProduct = await services.getProductByTypeAndPrice(
    obj.type, obj.pricevalue);
  if (similarProduct === undefined || similarProduct === null) {
    await services.createProduct(obj);
  } else {
    await services.updateProduct({
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
