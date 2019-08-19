const User = require('../models/user');
const { hashPassword, transformUser } = require('../helpers/hashing');
const { generateUserToken } = require('../middleware/authenticate');

const login = async (req, res) => {
  /**
   *method to add a new user to the database
   *@params {req,res}
   *@returns {res}
   */
  const email = req.body.email.toLowerCase().trim();
  const password = await hashPassword(req.body.password.toLowerCase().trim());

  User.findOne({ email })
    .then((user) => {
      if (!user) return res.statusCode(404).send('Invalid User');
      if (user.password === password) {
        return generateUserToken(user)
          .then(() => res.statusCode(200).json(transformUser(user)));
      }
    });
};

module.exports = login;
