const axios = require('axios');
const { getOrderById } = require('./crud/order');
const logger = require('../utils/logger');
const { novaPoshtaUrl: { baseURL, url} } = require('../utils/constants');

const deliveryPriceNP = ({
  orderWeight,
  orderPrice,
  citySender,
  cityReceiver
  }) => axios ({
    method: 'post',
    baseURL,
    url,
    data: {
      modelName: 'InternetDocument',
      calledMethod: 'getDocumentPrice',
      methodProperties: {
        CitySender: citySender[0].Ref,
        CityRecipient: cityReceiver[0].Ref,
        Weight: orderWeight,
        ServiceType: 'WarehouseWarehouse',
        Cost: orderPrice,
        CargoType: 'Cargo',
        SeatsAmount: '1'
      }
    },
    headers: {
      'Content-Type': 'application/json',
    }
});

const getCityCode = (city) => axios ({
  method: 'post',
  baseURL,
  url,
  data: {
    modelName: 'Address',
    calledMethod: 'getCities',
    methodProperties: {
        FindByString: city
    }
  },
  headers: {
    'Content-Type': 'application/json',
  }
});

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
    if (!deliveryCost[0].Cost) {
      throw new Error('Can not count thr delivery price');
    }
    return deliveryCost[0].Cost;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

module.exports = {
  countDeliveryPrice
};
