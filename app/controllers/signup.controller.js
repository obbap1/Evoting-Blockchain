const User = require('../models/user');
const { hashPassword } = require('../helpers/hashing');

const createUser = async (req, res) => {
  const password = await hashPassword(req.body.password.toLowerCase().trim());

  const user = new User({
    firstname: req.body.firstname.toLowerCase().trim(),
    lastname: req.body.lastname.toLowerCase().trim(),
    email: req.body.email.toLowerCase().trim(),
    passport: req.body.passport.toLowerCase().trim(),
    password,
  });

  console.log('here', user);

  await user.save((err) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send('You have registered successfully');
  });
};

module.exports = createUser;
