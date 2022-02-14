const { pipeline } = require('stream');
const { promisify } = require('util');
const { env } = require('../../config');
const { constants } = require('../../utils');

const promisifiedPipeline = promisify(pipeline);

const createCsvToJson = require('./csvToJsonUtils/csvToJson');

async function uploadCsv(inputStream) {
  const csvToJson = createCsvToJson();

  try {
    await promisifiedPipeline(inputStream, csvToJson);
  } catch (err) {
    if ( env === constants.env.dev ) {
      console.error('Csv pipeline failed', err);
    }
  }
}

module.exports = uploadCsv;
