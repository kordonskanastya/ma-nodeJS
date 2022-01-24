/* eslint-disable no-return-await */
const productService = require('../product');
const db = require('../../db');

async function dataOptimizerDB (obj) {
  const [{ itemId }] = await db.Item
      .findOrCreate({
        attributes: ['itemId'],
        where: { item: obj.item }
      });
      const [{ typeId }] = await db.Type
      .findOrCreate({
        attributes: ['typeId'],
        where: { type: obj.type }
      });
  const similarProduct = await productService.getProductByTypeAndPrice(
    typeId, obj.pricevalue);
  if (!similarProduct) {
    return await productService.createProduct({
      itemId,
      typeId,
      measure: obj.measure,
      measurevalue: obj.measurevalue,
      pricetype: obj.pricetype,
      pricevalue: obj.pricevalue
    }, {item: obj.item, type: obj.type});
  }
  return await productService.updateProduct({
    id: similarProduct.dataValues.id,
    itemId,
    typeId,
    measure: similarProduct.dataValues.measure,
    measurevalue: similarProduct.dataValues.measurevalue + obj.measurevalue,
    pricetype: similarProduct.dataValues.pricetype,
    pricevalue: similarProduct.dataValues.pricevalue
  });
}

module.exports = dataOptimizerDB;
