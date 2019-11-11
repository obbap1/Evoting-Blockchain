const express = require("express");

const router = express.Router();
const { check, validationResult } = require("express-validator");
const signupController = require("../../../app/controllers/auth/signup.controller")
  .createUser;
const loginController = require("../../../app/controllers/auth/signin.controller");

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

/**
 * @api {post} /api/v1/auth/signup/ Register User
 * @apiName Register User
 * @apiGroup User
 *
 * @apiParam {String} firstname User's first name
 * @apiParam {String} lastname User's last name
 * @apiParam {String} email User's email
 * @apiParam {String} type User's type (voter or candidate). Default: voter
 * @apiParam {String} password User's password
 * @apiParam {String} passport User's passport
 *
 * @apiSuccess {String} message You have registered successfully.
 * @apiError {Array} errors Errors
 */
router.post(
  "/signup",
  [
    [
      check("firstname").exists(),
      check("lastname").exists(),
      check("password")
        .exists()
        .isLength({ min: 6 }),
      check("email").isEmail()
    ],
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      return next();
    }
  ],
  signupController
);

/**
 * @api {post} /api/v1/auth/signin/ Grant User Access
 * @apiName  User Sign in
 * @apiGroup User
 *
 * @apiParam {String} email User's email
 * @apiParam {String} password User's password
 *
 * @apiSuccess {Object} data {
 *      firstname: '',
 *      lastname: '',
 *      token: '',
 *      type: ''
 * }
 * @apiError {Array} errors Errors
 */

router.post(
  "/signin",
  [
    [check("email").exists(), check("password").exists()],
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      return next();
    }
  ],
  loginController
);

module.exports = router;
