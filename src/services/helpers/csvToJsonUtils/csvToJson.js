const { Transform } = require('stream');
// const chunkToJson = require('./chunkToJson');

function strSplit(str) {
  const contentAndPrice = str
  .replace('"', '')
  .replace('"', '')
  .split('$');
  const content = contentAndPrice[0].split(',');
  content.pop();
  content.push(`$${contentAndPrice[1]}`);
  return content;
}

function chunkToJson(headers, array) {
  const lenHeaders = headers.length;
  array.pop();
  const res = array.map(element => {
    const contentArray = strSplit(element);
    const resObj = {};
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < lenHeaders; i++) {
      resObj[headers[i]] = contentArray[i];
    }
    console.log(resObj);
    return resObj;
  });
  return res;
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
      chunkLastLine = dataArray[dataArray.length - 1];
      dataArray.shift();
      const res = chunkToJson(headers, dataArray);
      callback(null, JSON.stringify(res));
      return;
    }

    const dataArray = chunk.toString().concat(chunkLastLine).split('\n');
    chunkLastLine = dataArray[dataArray.length - 1];
    const res = chunkToJson(headers, dataArray);
    callback(null, JSON.stringify(res));
  };

  return new Transform({ transform });
}

module.exports = createCsvToJson;
