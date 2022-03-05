/* eslint-disable no-param-reassign */
const { Transform } = require('stream');
const chunkToJson = require('./chunkToJson');
const jsonOptimizer = require('./jsonOptimizer');
const logger = require('../../../utils/logger');

async function pushOptimizedFormattedJson(headersArray, array){
  const lastLine = array[array.length - 1];
  const chunkJson = chunkToJson(headersArray, array);
  await jsonOptimizer(chunkJson);
  return lastLine;
}

function validationHeaders (headers) {
  // eslint-disable-next-line no-restricted-syntax
  for(let i = 0; i < headers.length; i += 1) {
    if (headers[i] === 'measureValue') {
      headers[i] = 'measurevalue';
    } else if (headers[i] === 'priceType') {
      headers[i] = 'pricetype';
    } else if (headers[i] === 'priceValue') {
      headers[i] = 'pricevalue';
    }
  }
  return headers;
}

function createCsvToJson() {
  let isFirstChunk = true;
  let headers = [];
  let chunkLastLine = '';

  const transform = async (chunk, encoding, callback) => {
    if (isFirstChunk) {
      isFirstChunk = false;
      const dataArray = chunk.toString().split('\n');
      headers = validationHeaders(dataArray[0].split(','));
      dataArray.shift();
      chunkLastLine = await pushOptimizedFormattedJson(headers, dataArray);
      callback(null);
    } else {
      const dataArray = chunkLastLine.concat(chunk.toString()).split('\n');
      chunkLastLine = await pushOptimizedFormattedJson(headers, dataArray);
      callback(null);
    }
  };

  const flush = async (callback) => {
    logger.info('No more data to read!');
    callback(null);
  };

  return new Transform({ transform, flush });
}

module.exports = createCsvToJson;
