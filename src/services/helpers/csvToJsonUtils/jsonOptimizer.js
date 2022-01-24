const createUniqueProduct = require('../createUniqueProduct');

async function jsonOptimizer(array) {
  // eslint-disable-next-line no-restricted-syntax
  for (const obj of array) {
    // eslint-disable-next-line no-await-in-loop
    await createUniqueProduct(obj);
  }
};

module.exports = jsonOptimizer;
