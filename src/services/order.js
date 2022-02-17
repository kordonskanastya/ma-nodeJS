const { getOrderById } = require('./crud/order');
const { deliveryPriceNP, getCityCode } = require('../lib/novaPoshta/axios');
const logger = require('../utils/logger');

async function countDeliveryPrice (data) {
  try {
    const {data: {data: citySender}} = await getCityCode(data.citySender);
    if (!citySender[0] || citySender[0].Description !== data.citySender) {
        throw new Error(`There is no such city: ${data.citySender}`);
    }
    const {data: {data: cityReceiver}} = await getCityCode(data.cityReceiver);
    if (!cityReceiver[0] || cityReceiver[0].Description !== data.cityReceiver) {
        throw new Error(`There is no such city: ${data.cityReceiver}`);
    }

    const orderData = await getOrderById(data.orderId);
    if (!orderData || !orderData.id) {
      throw new Error(`There is no such order: ${data.orderId}`);
    }
    const orderWeight = orderData.quantity;
    const orderPrice = orderWeight
      * orderData.product.dataValues.pricevalue.slice(1);

    const {data: {data: deliveryCost}} = await deliveryPriceNP({
      orderWeight,
      orderPrice,
      citySender,
      cityReceiver });
    return deliveryCost[0].Cost;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

module.exports = {
  countDeliveryPrice
};
