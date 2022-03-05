const { pipeline } = require('stream');
const { promisify } = require('util');
const logger = require('../../utils/logger');
const createCsvToJson = require('./csvToJsonUtils/csvToJson');

const promisifiedPipeline = promisify(pipeline);

async function uploadCsv(inputStream) {
  try {
    const csvToJson = createCsvToJson();
    await promisifiedPipeline(inputStream, csvToJson);
  } catch (err) {
    logger.error('Csv pipeline failed', err);
  }
}

module.exports = uploadCsv;
