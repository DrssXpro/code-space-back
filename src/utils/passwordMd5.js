const md5 = require("md5");
const { MD5_KEY } = require("../config/config");

function encryptedPassword(password) {
  return md5(md5(password + MD5_KEY));
}

module.exports = {
  encryptedPassword,
};
