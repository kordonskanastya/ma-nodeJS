function strSplit(str) {
  const contentAndPrice = str
  .replace(/"/g, '')
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
    return resObj;
  });
  return res;
}

module.exports = chunkToJson;
