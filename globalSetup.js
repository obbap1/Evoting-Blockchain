const mongoUnit = require('mongo-unit');
const app = require('./app');
const redis = require('./config/redis');


module.exports = () => new Promise((resolve) => {
  mongoUnit.start().then((testMongoUrl) => {
    process.env.DATABASE_URL = testMongoUrl;
    process.env.REDISCLOUD_URL = 'redis://localhost:6379';
    redis.getInstance();
    resolve();
  });
});
