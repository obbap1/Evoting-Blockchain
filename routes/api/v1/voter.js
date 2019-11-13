const express = require("express");

const router = express.Router();

const VoterController = require("../../../app/controllers/voter.controller");
const {
  authorize,
  isAuthenticated
} = require("../../../app/middleware/authenticate");

/**
 * @api {get} /voter/current-elections/ Get All ongoing elections
 * @apiName  Ongoing Elections
 * @apiGroup Voter
 *
 *
 * @apiSuccess {Object} data {}
 * @apiError {Array} errors Errors
 */

router.get(
  "/current-elections",
  [authorize(), isAuthenticated()],
  VoterController.currentElections
);

/**
 * @api {post} /voter/vote/ Vote for a candidate
 * @apiName  User Vote
 * @apiGroup User
 *
 * @apiParam {String} candidateId ID of the candidate
 * @apiParam {String} electionId ID of the election
 *
 * @apiSuccess {string} data success message
 * @apiError {Array} errors Errors
 */

router.post(
  "/vote",
  [isAuthenticated("voter")],
  VoterController.voteForCandidate
);

module.exports = router;
