const { db: { config, defaultType } } = require('../config');
const { exit } = require('../utils');

const db = {};
let type = defaultType;

// eslint-disable-next-line consistent-return
const funcWrapper = (func) => {
    if (typeof func === 'function') {
        return func;
    }
    exit(`FATAL: Cannot find ${func.name}`);
};

const init = async () => {
    try {
        // eslint-disable-next-line no-restricted-syntax
        for (const [k, v] of Object.entries(config)) {
            // eslint-disable-next-line import/no-dynamic-require,global-require
            const wrapper = require(`./${k}`)(v);
            // eslint-disable-next-line no-await-in-loop
            await wrapper.testConnection();
            console.log(`INFO: DB wrapper for ${k} initiated`);
            db[k] = wrapper;
        }
    } catch (err) {
        exit(err.message || err);
    }
};

const end = async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [k, v] of Object.entries(db)) {
        // eslint-disable-next-line no-await-in-loop
        await v.close();
        console.log(`INFO: DB wrapper for ${k} was closed`);
    }
};

const setType = (t) => {
    if (!t || !db[t]) {
        console.log('WARNING: Cannot find provided DB type!');
        return false;
    }
    type = t;
    console.log(`INFO: The DB type has been changed to ${t}`);
    return true;
};

const getType = () => type;

const dbWrapper = (t) =>  db[t] || db[type];

module.exports = {
  init,
  end,
  setType,
  getType,
  dbWrapper,
  // ----------------

  testConnection: async () => funcWrapper(dbWrapper().testConnection)(),
  close: async () => funcWrapper(dbWrapper().close)(),
  getAllProducts: async () => funcWrapper(dbWrapper().getAllProducts)(),
  createProduct: async (product) => funcWrapper(dbWrapper()
    .createProduct)(product),
  getProduct: async (id) => funcWrapper(dbWrapper().getProduct)(id),
  updateProduct: async (product) => funcWrapper(dbWrapper()
    .updateProduct)(product),
  deleteProduct: async (id) => funcWrapper(dbWrapper().deleteProduct)(id),
  getProductByTypeAndPrice: async (productType, productPrice) =>
    funcWrapper(dbWrapper()
      .getProductByTypeAndPrice)(productType, productPrice),
};
