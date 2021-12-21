require('dotenv').config();

// secret: process.env.SECRET || process.exit(1)

function exit () {
  throw new Error('Can\'t working without value');
}

const config = {
  port: process.env.PORT || 3000,
  loginEnv: process.env.LOGIN || exit(),
  passwordEnv: process.env.PASSWORD || exit()
};


module.exports = config;
