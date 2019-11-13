const express = require('express');

const router = express.Router();

const ElectionController = require('../../../app/controllers/election.controller');
const { isAuthenticated } = require('../../../app/middleware/authenticate');

/**
 * @api {get} /election/history/ See Previous and Current elections and results
 * @apiName  History
 * @apiGroup
 *
 *
 * @apiSuccess {Object} message success message
 * @apiError {Array} errors Errors
 */

router.post('/history', [isAuthenticated()], ElectionController.getHistory);

module.exports = router;
