require('dotenv').config();

function exit (field) {
  console.error(`Can't working without value for field: ${field}`);
  process.exit(1);
}

const config = {
  port: process.env.PORT || 3000,
  loginEnv: process.env.LOGIN || exit('loginEnv'),
  passwordEnv: process.env.PASSWORD || exit('passwordEnv'),
  db: {
    user: process.env.DB_USER || exit('db_user'),
    host: process.env.DB_HOST || exit('db_host'),
    port: process.env.DB_PORT || exit('db_port'),
    database: process.env.DB_NAME || exit('db_name'),
    password: process.env.DB_PASS || exit('db_pass'),
  }
};


module.exports = config;
