const { pipeline } = require('stream');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const promisifiedPipeline = promisify(pipeline);

const createCsvToJson = require('./csvToJsonUtils/csvToJson');

async function uploadCsv(inputStream) {
  const dirName = '../../data';
  const dataPath = path.join(__dirname, dirName);
  const timestamp = Date.now();
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath);
  }
  const filepath = `${dataPath}/${timestamp}.json`;
  const outputStream = fs.createWriteStream(filepath);
  const csvToJson = createCsvToJson(filepath);

  try {
    await promisifiedPipeline(inputStream, csvToJson, outputStream);
  } catch (err) {
    console.error('Csv pipeline failed', err);
  }
}

module.exports = uploadCsv;
