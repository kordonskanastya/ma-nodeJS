const { pipeline } = require('stream');
const fs = require('fs');
const { promisify } = require('util');

const promisifiedPipeline = promisify(pipeline);

const createCsvToJson = require('./csvToJsonUtils/csvToJson');

async function uploadCsv(inputStream) {
  const timestamp = Date.now();
  const filepath = `src/data/${timestamp}.json`;
  const outputStream = fs.createWriteStream(filepath);
  const csvToJson = createCsvToJson(filepath);

  try {
    await promisifiedPipeline(inputStream, csvToJson, outputStream);
  } catch (err) {
    console.error('Csv pipeline failed', err);
  }
}

module.exports = uploadCsv;
