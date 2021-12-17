require('dotenv').config();

// secret: process.env.SECRET || process.exit(1)

const config = {
  port: process.env.PORT || 3000,
  loginEnv: process.env.LOGIN || new Error('Login is absent'),
  passwordEnv: process.env.PASSWORD || new Error('Password is absent')
};


module.exports = config;
