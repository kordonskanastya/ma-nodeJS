/* eslint-disable no-return-await */
const productService = require('../crud/product');
const db = require('../../db');
const { validator } = require('./index');

async function dataOptimizerDB (obj) {
  if (!validator([obj])) {
    throw new Error('Not Acceptable');
  }
  const [{ id: itemId }] = await db.Item
      .findOrCreate({
        attributes: ['id'],
        where: { item: obj.item }
      });
      const [{ id: typeId }] = await db.Type
      .findOrCreate({
        attributes: ['id'],
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
    });
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
