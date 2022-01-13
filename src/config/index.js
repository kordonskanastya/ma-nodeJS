require('dotenv').config();
const { exit } = require('../utils');

const config = {
  port: process.env.PORT || 3000,
  loginEnv: process.env.LOGIN || exit('loginEnv'),
  passwordEnv: process.env.PASSWORD || exit('passwordEnv'),
  db: {
    defaultType: process.env.DB_WRAPPER_TYPE || 'knex',
    config: {
      knex: {
        client: 'postgresql',
        connection: {
          user: process.env.DB_USER || exit('db_user'),
          host: process.env.DB_HOST || exit('db_host'),
          port: process.env.DB_PORT || exit('db_port'),
          database: process.env.DB_NAME || exit('db_name'),
          password: process.env.DB_PASS || exit('db_pass')
        },
        pool: {
          min: 2,
          max: 10
        },
        debug: false
      },
      pg: {
        user: process.env.DB_USER || exit('db_user'),
        host: process.env.DB_HOST || exit('db_host'),
        port: process.env.DB_PORT || exit('db_port'),
        database: process.env.DB_NAME || exit('db_name'),
        password: process.env.DB_PASS || exit('db_pass')
      },
      sequelize: {
        dialect: 'postgres',
        username: process.env.DB_USER || exit('db_user'),
        host: process.env.DB_HOST || exit('db_host'),
        port: process.env.DB_PORT || exit('db_port'),
        database: process.env.DB_NAME || exit('db_name'),
        password: process.env.DB_PASS || exit('db_pass'),
        logging: false,
        pool: {
          min: 0,
          max: 10,
          idle: 5000,
          aquire: 5000,
          evict: 5000
        },
      }
    }
  }
};


module.exports = config;
