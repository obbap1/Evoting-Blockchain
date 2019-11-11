const crypto = require("crypto");

// Hash password
const hashPassword = async password => {
  try {
    const encrypted = crypto
      .createHmac("sha256", password)
      .update(process.env.APP_KEY)
      .digest("hex");
    return encrypted;
  } catch (e) {
    console.log(`Error at hashing password: ${e}`);
  }
};

// Ensure the password isnt sent back to the frontend
const transformUser = user => {
  // eslint-disable-next-line no-param-reassign
  delete user.password;
  return user;
};

const returnLowerCase = x => x.toLowerCase();
const trim = x => x.trim();

module.exports = {
  hashPassword,
  transformUser,
  returnLowerCase,
  trim
};
