const User = require("../../models/user");
const {
  hashPassword,
  transformUser,
  returnLowerCase,
  trim
} = require("../../helpers/utils");
const { generateUserToken } = require("../../middleware/authenticate");

const login = async (req, res) => {
  /**
   *method to add a new user to the database
   *@params {req,res}
   *@returns {res}
   */
  let { email, password } = req.body;
  email = returnLowerCase(trim(email));
  password = await hashPassword(returnLowerCase(trim(password)));

  User.findOne({ email }).then(user => {
    if (!user) return res.statusCode(404).send("Invalid User");
    if (user.password === password) {
      return generateUserToken(user).then(u =>
        res.status(200).json(transformUser(u))
      );
    }
  });
};

module.exports = login;
