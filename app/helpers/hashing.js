const crypto = require('crypto');

const hashPassword = async (password) => {
  console.log('here');
  try {
    const key = await crypto.scryptSync(password, 'salt', 24);
    console.log({ key });
    const iv = Buffer.alloc(16, 0);
    console.log({ iv });
    const cipher = await crypto.createCipheriv(process.env.ALGORITHM, key, iv);
    console.log({ cipher });
    let encrypted = await cipher.update(process.env.APP_KEY, 'utf8', 'hex');
    console.log({ encrypted });
    encrypted += cipher.final('hex');
    console.log({ encrypted });
    return encrypted;
  } catch (e) {
    console.log(`Error at hashing password: ${e}`);
  }
};

module.exports = {
  hashPassword,
};
