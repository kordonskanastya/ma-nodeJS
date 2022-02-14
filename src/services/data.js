const {
  validator,
  uploadCsv
} = require('./helpers/index');
const createUniqueProduct = require('./helpers/createUniqueProduct');
const { successMessage, constants } = require('../utils');
const { env } = require('../config');

function getHomePage() {
  return successMessage({'result': 'hello world!'});
}

async function postData(serverGoodsArray) {
  if (!validator(serverGoodsArray)) {
    throw new Error('Not Acceptable');
  }
  try{
    // eslint-disable-next-line no-restricted-syntax
    for (const obj of serverGoodsArray) {
      // eslint-disable-next-line no-await-in-loop
      await createUniqueProduct(obj);
    }
  } catch (err) {
    if ( env === constants.env.dev ) {
      console.error(err.message || err);
    }
    throw new Error('Unable to write file');
  }

  return successMessage({'result': 'rewritten data.json'});
}

async function uploadDataCsv(req) {
  try{
    await uploadCsv(req);
    return successMessage({result: 'CSV file convert to JSON'});
  } catch (err) {
    if ( env === constants.env.dev ) {
      console.error(
        'Can not convert csv to JSON in helpers',
        err.message || err
      );
    }
    throw new Error('Can not convert csv to JSON');
  }
}

module.exports =
{
  getHomePage,
  postData,
  uploadDataCsv
};
