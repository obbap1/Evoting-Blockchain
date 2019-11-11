const express = require("express");

const router = express.Router();

const profileController = require("../../../app/controllers/profile.controller");
const {
  authorize,
  isAuthenticated
} = require("../../../app/middleware/authenticate");

/**
 * @api {get} /api/v1/profile/get-profile/ Get User Profile
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
 * @api {post} /vote/ Vote for a candidate
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

router.post("/create-election", [isAuthenticated("admin")]);

router.get("/get-votes", [isAuthenticated("candidate")]);

router.get("/blockchain", [isAuthenticated()]);

router.get("/get-all-candidates", [isAuthenticated("voter")]);

router.get("/get-all-votes", [isAuthenticated()]);

module.exports = router;
