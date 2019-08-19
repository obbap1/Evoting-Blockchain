const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const signupController = require('../app/controllers/signup.controller').createUser;
const loginController = require('../app/controllers/signin.controller');
const profileController = require('../app/controllers/profile.controller');
const {
  authorize, isAuthenticated,
} = require('../app/middleware/authenticate');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

/**
 * @api {post} /signup/ Request User information
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
 * @apiSuccess {String} You have registered successfully.
 * @apiError {Array} Errors .
 */

router.post(
  '/signup',
  [[
    check('firstname').exists(),
    check('lastname').exists(),
    check('password')
      .exists()
      .isLength({ min: 6 }),
    check('email').isEmail(),
    check('type').exists(),
  ], (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    return next();
  }],
  signupController,
);

/**
 * @api {post} /login/ Grant User Access
 * @apiName  User Sign in
 * @apiGroup User
 *
 * @apiParam {String} email User's email
 * @apiParam {String} password User's password
 *
 * @apiSuccess {Object} {
 *      firstname: '',
 *      lastname: '',
 *      .........: '',
 *      token: ''
 * }
 * @apiError {Array} Errors .
 */

router.post(
  '/signin',
  [[
    check('email').exists(),
    check('password').exists(),
  ], (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    return next();
  }],
  loginController,
);

/**
 * @api {get} /get-profile/ Get User Profile
 * @apiName  User Profile
 * @apiGroup User
 *
 *
 * @apiSuccess {Object} {
 *      firstname: '',
 *      lastname: '',
 *      email: '',
 *      type: ''
 * }
 * @apiError {Array} Errors .
 */

router.get(
  '/get-profile',
  [authorize(), isAuthenticated()],
  profileController,
);

/**
 * @api {post} /vote/ Vote for a candidate
 * @apiName  User Vote
 * @apiGroup User
 *
 * @apiParam {String} candidateId ID of the candidate
 * @apiParam {String} password User's password
 *
 * @apiSuccess {Object} {
 *      firstname: '',
 *      lastname: '',
 *      .........: '',
 *      token: ''
 * }
 * @apiError {Array} Errors .
 */

router.post(
  '/vote',
  [isAuthenticated('voter')],
);

router.post(
  '/create-election',
  [isAuthenticated('admin')],
);

router.get(
  '/get-votes',
  [isAuthenticated('candidate')],
);

router.get(
  '/blockchain',
  [isAuthenticated()],
);

router.get(
  '/get-all-candidates',
  [isAuthenticated('voter')],
);

router.get(
  '/get-all-votes',
  [isAuthenticated()],
);

module.exports = router;
