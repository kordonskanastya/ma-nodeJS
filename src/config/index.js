require('dotenv').config();

// secret: process.env.SECRET || process.exit(1)

function exit (field) {
  throw new Error(`Can't working without value for field: ${field}`);
}

const config = {
  port: process.env.PORT || 3000,
  loginEnv: process.env.LOGIN || exit('loginEnv'),
  passwordEnv: process.env.PASSWORD || exit('passwordEnv')
};


module.exports = config;
