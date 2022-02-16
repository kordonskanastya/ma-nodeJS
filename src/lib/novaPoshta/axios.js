const axios = require('axios');

module.exports = (body) => axios ({
    method: 'post',
    baseURL: 'https://api.novaposhta.ua',
    url: '/v2.0/json/InternetDocument/getDocumentPrice',
    data: {
      modelName: 'InternetDocument',
      calledMethod: 'getDocumentPrice',
      methodProperties: {
        CitySender: body.citySender,
        CityRecipient: body.cityReceiver,
        Weight: body.orderWeight,
        ServiceType: 'WarehouseWarehouse',
        Cost: body.orderPrice,
        CargoType: 'Cargo',
        SeatsAmount: '1'
      }
    },
    headers: {
      'Content-Type': 'application/json',
    }
  });
