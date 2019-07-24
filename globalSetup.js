const mongoUnit = require('mongo-unit');
const app = require('./app');

module.exports = () => new Promise((resolve) => {
  mongoUnit.start().then((testMongoUrl) => {
    process.env.DATABASE_URL = testMongoUrl;
    resolve();
  });
});
