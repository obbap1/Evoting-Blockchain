const User = require("../../models/user");
const { hashPassword, returnLowerCase, trim } = require("../../helpers/utils");

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
      passport: passport ? returnLowerCase(trim(passport)) : "",
      type: returnLowerCase(trim(type)),
      password
    });

    await user.save(err => {
      if (err) return res.status(500).send(err);
      return res.status(200).send("You have registered successfully");
    });
  };
}

const createUser = async (req, res) => {
  const createNewUser = createUserFactory(User, hashPassword);
  try {
    await createNewUser(req, res);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createUserFactory,
  createUser
};
