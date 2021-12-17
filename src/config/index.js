require('dotenv').config();

// secret: process.env.SECRET || process.exit(1)

const config = {
  port: process.env.PORT || 3000,
  loginEnv: process.env.LOGIN || process.exit(1),
  passwordEnv: process.env.PASSWORD || process.exit(1)
};


module.exports = config;
