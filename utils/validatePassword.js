const bcrypt = require("bcrypt");
const validatePassword = async function (candidatePassword, actualPassword) {
  return await bcrypt.compare(candidatePassword, actualPassword);
};
module.exports = validatePassword;
