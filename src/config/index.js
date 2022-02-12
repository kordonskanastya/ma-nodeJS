require('dotenv').config();

function exit (field) {
  console.error(`Can't working without value for field: ${field}`);
  process.exit(1);
}

const config = {
  env: process.env.ENVIRONMENT || 'dev',
  port: process.env.PORT || 3000,
  accessTokenSecret:
    process.env.ACCESS_TOKEN_SECRET || exit('accessTokenSecret'),
  refreshTokenSecret:
    process.env.REFRESH_TOKEN_SECRET || exit('refreshTokenSecret'),
  passwordSecret: process.env.PASSWORD_SECRET || exit('passwordSecret'),
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
    }
  }
};

module.exports = config;
