const express = require("express");

const router = express.Router();

const profileController = require("../../../app/controllers/profile.controller");
const voteController = require("../../../app/controllers/profile.controller");
const {
  authorize,
  isAuthenticated
} = require("../../../app/middleware/authenticate");

/**
 * @api {get} /profile/get-profile/ Get User Profile
 * @apiName  User Profile
 * @apiGroup User
 *
 *
 * @apiSuccess {Object} data {
 *      firstname: '',
 *      lastname: '',
 *      email: '',
 *      type: ''
 * }
 * @apiError {Array} errors Errors
 */

router.get("/get-profile", [authorize(), isAuthenticated()], profileController);

/**
 * @api {post} /profile/vote/ Vote for a candidate
 * @apiName  User Vote
 * @apiGroup User
 *
 * @apiParam {String} candidateId ID of the candidate
 * @apiParam {String} password User's password
 *
 * @apiSuccess {Object} data {
 *      firstname: '',
 *      lastname: '',
 *      token: ''
 * }
 * @apiError {Array} errors Errors
 */

router.post("/vote", [isAuthenticated("voter")]);

/**
 * @api {post} /profile/create-election/ Create Election
 * @apiName  Create Election
 * @apiGroup Admin
 *
 * @apiParam {String} name Name of the election
 *
 * @apiSuccess {Object} message success message
 * @apiError {Array} errors Errors
 */

router.post("/create-election", [isAuthenticated("admin")]);

/**
 * @api {get} /profile/get-votes/ Votes for a candidate
 * @apiName  See votes
 * @apiGroup Candidate
 *
 * @apiParam {string} id ID of the election
 *
 * @apiSuccess {number} votes Number of votes
 * @apiError {Array} errors Errors
 */

router.get("/get-votes/:id", [isAuthenticated("candidate")]);

router.get("/blockchain", [isAuthenticated("admin")]);

router.get("/get-all-candidates", [isAuthenticated("voter")]);

router.get("/get-all-votes", [isAuthenticated("candidate")]);

module.exports = router;
