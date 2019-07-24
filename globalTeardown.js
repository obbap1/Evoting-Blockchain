const mongoUnit = require('mongo-unit');

module.exports = () => new Promise((resolve) => {
  mongoUnit.drop();
  resolve();
});
