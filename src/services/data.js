const {
  uploadCsv
} = require('./helpers/index');
const createUniqueProduct = require('./helpers/createUniqueProduct');
const { successMessage } = require('../utils');
const logger = require('../utils/logger');

function getHomePage() {
  return successMessage({'result': 'hello world!'});
}

async function postData(serverGoodsArray) {
  try{
    // eslint-disable-next-line no-restricted-syntax
    for (const obj of serverGoodsArray) {
      // eslint-disable-next-line no-await-in-loop
      await createUniqueProduct(obj);
    }
  } catch (err) {
    logger.error('Unable to write file', err);
    throw new Error('Unable to write file');
  }

  return successMessage({'result': 'rewritten data.json'});
}

async function uploadDataCsv(req) {
  try{
    await uploadCsv(req);
    return successMessage({result: 'CSV file convert to JSON'});
  } catch (err) {
    logger.error('Can not convert csv to JSON in helpers', err);
    throw new Error('Can not convert csv to JSON');
  }
}

module.exports =
{
  getHomePage,
  postData,
  uploadDataCsv
};
