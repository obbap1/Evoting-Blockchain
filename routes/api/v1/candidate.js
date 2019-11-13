const express = require('express');

const router = express.Router();

const CandidateController = require('../../../app/controllers/candidate.controller');
const { isAuthenticated } = require('../../../app/middleware/authenticate');

/**
 * @api {post} /candidate/register-election/ Register as a candidate for an election
 * @apiName  Register for election
 * @apiGroup Candidate
 *
 * @apiParam {String} electionId ID of the election
 *
 * @apiSuccess {string} data success message
 * @apiError {Array} errors Errors
 */

router.post(
  '/register-election',
  [isAuthenticated('candidate')],
  CandidateController.registerForElection
);

module.exports = router;
