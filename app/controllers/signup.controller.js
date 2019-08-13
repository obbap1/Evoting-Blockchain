const User = require('../models/user');
const { hashPassword } = require('../helpers/hashing');

function createUserFactory(UserModel, hashPasswordFunction) {
  return async function createUser(req, res) {
  /**
   *method to add a new user to the database
   *@params {req,res}
   *@returns {res}
   */
    console.log(typeof hashPasswordFunction);
    const password = await hashPasswordFunction(req.body.password.toLowerCase().trim());

    const user = new UserModel({
      firstname: req.body.firstname.toLowerCase().trim(),
      lastname: req.body.lastname.toLowerCase().trim(),
      email: req.body.email.toLowerCase().trim(),
      passport: req.body.passport.toLowerCase().trim(),
      type: req.body.type.toLowerCase().trim(),
      password,
    });

    await user.save((err) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send('You have registered successfully');
    });
  };
}

const createUser = async (req, res) => {
  const createNewUser = createUserFactory(User, hashPassword);
  console.log('createnewuser', createNewUser);
  try {
    await createNewUser(req, res);
  } catch (e) {
    console.log(e);
  }
};


module.exports = {
  createUserFactory,
  createUser,
};
