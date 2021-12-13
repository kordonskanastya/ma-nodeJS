const { Transform } = require('stream');
const chunkToJson = require('./chunkToJson');
const jsonOptimizer = require('./jsonOptimizer');
const formatterObj = require('./formatterObj');

const res = [];

function pushOptimizedFormattedJson(headersArray, array){
  const lastLine = array[array.length - 1];
  const chunkJson = chunkToJson(headersArray, array);
  const optimizedJsonChunk = jsonOptimizer(chunkJson);
  const newObjFormat = formatterObj(optimizedJsonChunk);
  res.push(newObjFormat);
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
      callback(null, '');
    } else {
      const dataArray = chunkLastLine.concat(chunk.toString()).split('\n');
      chunkLastLine = pushOptimizedFormattedJson(headers, dataArray);
      callback(null, '');
    }
  };

  const flush = callback => {
    console.log('No more data to read!');
    const allDataArray = res.flat();
    const optimizedJsonChunk = jsonOptimizer(allDataArray);
    callback(null, JSON.stringify(optimizedJsonChunk));
  };


  return new Transform({ transform, flush });
}

module.exports = createCsvToJson;
