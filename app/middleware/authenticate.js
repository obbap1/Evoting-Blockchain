/* eslint-disable no-param-reassign */
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const redis = require('../../config/redis').getInstance();
const User = require('../models/user');

const tokenExpiration = 24 * 60 * 60;

// Read from private key
const options = {
  key: fs.readFileSync(path.join(__dirname, '../helpers/privateKey.pem'), 'utf8'),
  passphrase: process.env.PASS_PHRASE,
};

// Read public key
const publicKey = fs.readFileSync(
  path.join(path.normalize(`${__dirname}/..`), 'helpers/publicKey.pem'),
  'utf8',
);

// Cache user
const cacheUser = user => redis.set(`user::profile::${user.id}`, JSON.stringify(user), 'EX', tokenExpiration);

// Generate Token for user
const generateUserToken = user => new Promise((resolve) => {
  user = JSON.parse(JSON.stringify(user));
  cacheUser(user);
  user.token = jwt.sign({ type: user.type, email: user.email, id: user.id }, options, {
    algorithm: 'RS256',
    expiresIn: tokenExpiration,
  });
  resolve(user);
});

// find cached User
const getCachedUser = id => new Promise((resolve) => {
  redis.get(`user::profile::${id}`, (err, user) => {
    if (err) throw err;
    if (!user) {
      User.findOne(id).then((response) => {
        if (!response) return resolve(null);
        response = JSON.parse(JSON.stringify(response));
        cacheUser(response);
        return resolve(response);
      });
    }
    user = JSON.parse(user);
    return resolve(user);
  });
});

// Add token to response
const authorize = () => (req, res, next) => {
  if (!req.header('Authorization')) return res.status(401).send('invalid user');
  jwt.verify(
    req
      .header('Authorization')
      .toString()
      .split(' ')[1],
    publicKey,
    { algorithms: ['RS256'] },
    (err, decoded) => {
      if (err) return res.status(401).send(err);
      res.token = jwt.sign({ type: decoded.type, email: decoded.email, id: decoded.id }, options, {
        algorithm: 'RS256',
        expiresIn: tokenExpiration,
      });
      return getCachedUser(decoded.id).then((user) => {
        if (!user) return res.status(401).send('invalid user');
        user = Object.assign({}, user, decoded);
        req.authenticatedUser = user;
        next();
      });
    },
  );
};

// Confirm user is authenticated, or belongs to a particular type
const isAuthenticated = (type = '') => (req, res, next) => {
  if (!req.authenticatedUser || (type && req.authenticatedUser.type !== type)) {
    return res.status(401).send('Invalid User');
  }
  return next();
};

module.exports = {
  authorize,
  generateUserToken,
  cacheUser,
  isAuthenticated,
};
