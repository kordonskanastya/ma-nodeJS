const { Transform } = require('stream');
const chunkToJson = require('./chunkToJson');
const jsonOptimizer = require('./jsonOptimizer');
const formatterObj = require('./formatterObj');

function createCsvToJson() {
  let isFirstChunk = true;
  let headers = [];
  let chunkLastLine = '';
  const transform = (chunk, encoding, callback) => {
    if (isFirstChunk) {
      isFirstChunk = false;
      const dataArray = chunk.toString().split('\n');
      headers = dataArray[0].split(',');
      chunkLastLine = dataArray[dataArray.length - 1];
      dataArray.shift();
      const chunkJson = chunkToJson(headers, dataArray);
      const optimizedJsonChunk = jsonOptimizer(chunkJson);
      const newObjFormat = formatterObj(optimizedJsonChunk);
      callback(null, JSON.stringify(newObjFormat));
      return;
    }

    const dataArray = chunk.toString().concat(chunkLastLine).split('\n');
    chunkLastLine = dataArray[dataArray.length - 1];
    const chunkJson = chunkToJson(headers, dataArray);
    const optimizedJsonChunk = jsonOptimizer(chunkJson);
    const newObjFormat = formatterObj(optimizedJsonChunk);
    callback(null, JSON.stringify(newObjFormat));
  };

  return new Transform({ transform });
}

module.exports = createCsvToJson;
