const express = require('express');

const router = express.Router();

const CandidateController = require('../../../app/controllers/candidate.controller');
const {
  isAuthenticated,
  authorize
} = require('../../../app/middleware/authenticate');

/**
 * @api {post} /candidate/register-election/:id Register as a candidate for an election
 * @apiName  Register for election
 * @apiGroup Candidate
 *
 * @apiParam {String} id ID of the election
 *
 * @apiSuccess {string} data success message
 * @apiError {Array} errors Errors
 */

router.post(
  '/register-election/:id',
  [authorize(), isAuthenticated('candidate')],
  CandidateController.registerForElection
);

module.exports = router;
