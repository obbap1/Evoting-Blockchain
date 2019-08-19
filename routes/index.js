const express = require('express');

const router = express.Router();

const VersionOneRouter = require('./api/v1');

router.use('/api/v1', VersionOneRouter);

module.exports = router;
