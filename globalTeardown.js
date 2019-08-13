const mongoUnit = require('mongo-unit');
const redis = require('./config/redis');

module.exports = () => new Promise(async (resolve) => {
  await new Promise((res) => {
    redis.closeInstance(() => res());
  });
  await new Promise(res => setImmediate(res));
  mongoUnit.drop(() => resolve());
});
