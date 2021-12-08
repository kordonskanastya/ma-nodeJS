const { Transform } = require('stream');

function createCsvToJson() {
  let isFirstChunk = true;
  const transform = (chunk, encoding, callback) => {
    if (isFirstChunk) {
      isFirstChunk = false;
      callback(null, `[${chunk.toString()}`);
      return;
    }
    callback(null, `[\n${chunk.toString()}`);
  };

  const flush = callback => {
    // console.log('No more data to read!');
    callback(null, ']');
  };

  return new Transform({ transform, flush });
}

module.exports = createCsvToJson;
