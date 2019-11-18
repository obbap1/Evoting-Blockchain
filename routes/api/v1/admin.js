const express = require('express');

const router = express.Router();

const AdminController = require('../../../app/controllers/admin.controller');
const {
  isAuthenticated,
  authorize
} = require('../../../app/middleware/authenticate');

/**
 * @api {post} /admin/create-election/ Create Election
 * @apiName  Create Election
 * @apiGroup Admin
 *
 * @apiParam {String} name Name of the election
 *
 * @apiSuccess {Object} message success message
 * @apiError {Array} errors Errors
 */

router.post(
  '/create-election',
  [authorize(), isAuthenticated('admin')],
  AdminController.createElection
);

/**
 * @api {post} /admin/start-election/:id Start Election
 * @apiName  Start Election
 * @apiGroup Admin
 *
 * @apiParam {String} id ID of the election
 *
 * @apiSuccess {Object} message success message
 * @apiError {Array} errors Errors
 */
router.post(
  '/start-election/:id',
  [authorize(), isAuthenticated('admin')],
  AdminController.changeElectionStatus()
);

/**
 * @api {post} /admin/stop-election/:id Stop Election
 * @apiName  Stop Election
 * @apiGroup Admin
 *
 * @apiParam {String} id ID of the election
 *
 * @apiSuccess {Object} message success message
 * @apiError {Array} errors Errors
 */
router.post(
  '/stop-election/:id',
  [authorize(), isAuthenticated('admin')],
  AdminController.changeElectionStatus('completed', 'stopped')
);

/**
 * @api {get} /admin/votes/ Get Votes
 * @apiName  All Votes
 * @apiGroup Admin
 *
 *
 * @apiSuccess {Array} elections Array of elections
 * @apiError {Array} errors Errors
 */

router.get(
  '/get-votes',
  [authorize(), isAuthenticated('admin')],
  AdminController.getVotes
);

/**
 * @api {get} /admin/election-results/:id Get Election results
 * @apiName  Results for a particular election
 * @apiGroup Admin
 *
 *
 * @apiSuccess {Array} elections Array of elections
 * @apiError {Array} errors Errors
 */

router.get(
  '/election-results/:id',
  [authorize(), isAuthenticated('admin')],
  AdminController.getElectionResults
);

/**
 * @api {get} /admin/get-elections/?id= Get Elections
 * @apiName  All Elections
 * @apiGroup Admin
 *
 * @apiParam id ID of the election. if there is no id sent, it returns all the elections, send as a query.
 *
 * @apiSuccess {Array} elections Array of elections
 * @apiError {Array} errors Errors
 */

router.get(
  '/get-elections',
  [authorize(), isAuthenticated('admin')],
  AdminController.getElections
);

/**
 * @api {get} /admin/blockchain/:id See Blockchain of a particular election
 * @apiName  Blockchain
 * @apiGroup Admin
 *
 * @apiSuccess {number} votes Number of votes
 * @apiError {Array} errors Errors
 */

router.get(
  '/blockchain/:id',
  [authorize(), isAuthenticated('admin')],
  AdminController.getBlockChain
);

module.exports = router;
