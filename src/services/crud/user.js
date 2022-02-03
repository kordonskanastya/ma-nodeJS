const { User } = require('../../db');

const emptyArray = [];

const getUserByEmail = async (email) => {
  try {
    if (!email) {
      throw new Error('ERROR: No email defined');
    }
    const res = await User.findOne({
      where: { email }
    });
    if (!res || !res.dataValues) {
      return emptyArray;
    }
    return res.dataValues;
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
};

async function putRefreshToken(email, refreshToken) {
  try {
    if (!email) {
      throw new Error('ERROR: No email defined');
    }
    if (!refreshToken) {
      throw new Error('ERROR: No token defined');
    }
    const res = await User.update({ refreshToken }, { where: { email } });
      if (!res) {
        throw new Error('Can\'t update order');
      }
      return { result: 'token successfully updated' };
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

module.exports = {
  getUserByEmail,
  putRefreshToken
};
