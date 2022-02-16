const { getOrderById } = require('./crud/order');
const deliveryPriceNP = require('../lib/novaPoshta/axios');
const { env } = require('../config');
const constants = require('../utils/constants');

async function countDeliveryPrice (data) {
  try {
    const {
      quantity,
      product: { dataValues: product }
    } = await getOrderById(data.orderId);
    const orderWeight = quantity * product.measurevalue;
    const orderPrice = quantity * product.pricevalue.slice(1);
    const {
      data: { data: deliveryCost}
    } = await deliveryPriceNP({ ...data, orderWeight, orderPrice });
    return deliveryCost[0].Cost;
  } catch (err) {
    if ( env === constants.env.dev ) {
      console.error(err.message || err);
    }
    throw err;
  }
};

module.exports = {
  countDeliveryPrice
};
