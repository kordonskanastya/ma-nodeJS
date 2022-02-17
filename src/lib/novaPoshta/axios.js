const axios = require('axios');

const deliveryPriceNP = ({
  orderWeight,
  orderPrice,
  citySender,
  cityReceiver
  }) => axios ({
    method: 'post',
    baseURL: 'https://api.novaposhta.ua',
    url: '/v2.0/json/InternetDocument/getDocumentPrice',
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
  baseURL: 'https://api.novaposhta.ua',
  url: '/v2.0/json/InternetDocument/getDocumentPrice',
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


module.exports = {
  deliveryPriceNP,
  getCityCode
};
