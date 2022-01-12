const { Transform } = require('stream');
const config = require('../../../config');

const db = require('../../../db')(config.db);
const chunkToJson = require('./chunkToJson');
const jsonOptimizer = require('./jsonOptimizer');
// const formatterObj = require('./formatterObj');

const res = [];

function pushOptimizedFormattedJson(headersArray, array){
  const lastLine = array[array.length - 1];
  const chunkJson = chunkToJson(headersArray, array);
  // const newObjFormat = formatterObj(chunkJson);
  const optimizedJsonChunk = jsonOptimizer(chunkJson);
  res.push(optimizedJsonChunk);
  return lastLine;
}

function createCsvToJson() {
  let isFirstChunk = true;
  let headers = [];
  let chunkLastLine = '';

  const transform = (chunk, encoding, callback) => {
    if (isFirstChunk) {
      isFirstChunk = false;
      const dataArray = chunk.toString().split('\n');
      headers = dataArray[0].split(',');
      dataArray.shift();
      chunkLastLine = pushOptimizedFormattedJson(headers, dataArray);
      callback(null);
    } else {
      const dataArray = chunkLastLine.concat(chunk.toString()).split('\n');
      chunkLastLine = pushOptimizedFormattedJson(headers, dataArray);
      callback(null);
    }
  };

  const flush = async (callback) => {
    console.log('No more data to read!');
    const allDataArray = res.flat();
    const optimizedJsonChunk = jsonOptimizer(allDataArray);
    // eslint-disable-next-line no-restricted-syntax
    for (const obj of optimizedJsonChunk) {
      // eslint-disable-next-line no-await-in-loop
      await db.createProduct(obj);
    }
    callback(null);
  };


  return new Transform({ transform, flush });
}

module.exports = createCsvToJson;
