const {readdirSync} = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const modelsDir = path.join(__dirname, './models');

module.exports = (config) => {
  const sequelize = new Sequelize(config);
  const db = {};

  readdirSync(modelsDir)
  .filter(file => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
  .forEach(file => {
    // eslint-disable-next-line max-len,import/no-dynamic-require,global-require
    const model = require(path.join(modelsDir, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  const {
    getAllProducts,
    testConnection,
    close,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductByTypeAndPrice
  // eslint-disable-next-line global-require
  } = require('../../services/helpers/sequelizeDBMethods')(db, sequelize);

  return {
    getAllProducts,
    testConnection,
    close,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductByTypeAndPrice
  };
};
