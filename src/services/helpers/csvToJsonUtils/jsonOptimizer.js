const dataOptimizerDB = require('../addedDataOptimizerDB');

async function jsonOptimizer(array) {
  // eslint-disable-next-line no-restricted-syntax
  for (const obj of array) {
    // eslint-disable-next-line no-await-in-loop
    await dataOptimizerDB(obj);
  }
};

module.exports = jsonOptimizer;
