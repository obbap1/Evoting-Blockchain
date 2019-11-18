const User = require('../models/user');
const {
  hashPassword,
  transformUser,
  returnLowerCase,
  trim
} = require('../helpers/utils');
const { generateUserToken } = require('../middleware/authenticate');

//Factory function
function createUserFactory(UserModel, hashPasswordFunction) {
  return async function createUser(req, res) {
    /**
     *method to add a new user to the database
     *@params {req,res}
     *@returns {res}
     */

    let { firstname, lastname, email, passport, type, password } = req.body;

    password = await hashPasswordFunction(returnLowerCase(trim(password)));

    const user = new UserModel({
      firstname: returnLowerCase(trim(firstname)),
      lastname: returnLowerCase(trim(lastname)),
      email: returnLowerCase(trim(email)),
      passport: passport ? returnLowerCase(trim(passport)) : '',
      type: returnLowerCase(trim(type)),
      password
    });

    user
      .save()
      .then(() =>
        res
          .status(200)
          .send({ msg: 'You have registered successfully', data: null })
      )
      .catch(err => res.status(500).send({ msg: 'An Error occured', err }));
  };
}

//lOGIN
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
    if (!user) return res.status(404).send({ msg: 'Invalid User', data: null });
    if (user.password === password) {
      return generateUserToken(user).then(u =>
        res.status(200).json({
          msg: 'User Authentication Successful',
          data: transformUser(u)
        })
      );
    }
  });
};

//Create user
const createUser = async (req, res) => {
  const createNewUser = createUserFactory(User, hashPassword);
  try {
    await createNewUser(req, res);
  } catch (e) {
    console.log(e);
  }
};

const getUserProfile = async (req, res) => {
  /**
   *method to get user profile
   *@params {req,res}
   *@returns {res}
   */
  try {
    const user = await User.findById(req.authenticatedUser._id);
    if (!user)
      return res.status(500).send({ msg: "User can't be found", err: null });
    return res
      .status(200)
      .json({ msg: 'User profile found!', data: transformUser(user) });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = {
  createUserFactory,
  createUser,
  getUserProfile,
  login
};
