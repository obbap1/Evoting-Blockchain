const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const signupController = require('../app/controllers/signup.controller');

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
    check('passport').exists(),
    check('type').exists(),
  ], (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  }],
  signupController,
);

module.exports = router;
