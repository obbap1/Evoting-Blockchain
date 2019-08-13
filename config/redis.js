const redis = require('redis');
const url = require('url');

const redisURL = url.parse(process.env.REDISCLOUD_URL);

const Redis = (() => {
  let instance;

  function createInstance() {
    const client = redis.createClient(redisURL.port, redisURL.hostname, { no_ready_check: true });
    if (redisURL.auth) client.auth(redisURL.auth.split(':')[1]);
    return client;
  }

  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
    closeInstance: callback => instance.quit(callback),

  };
})();

module.exports = Redis;
