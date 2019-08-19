const User = require('../models/user');

const getUserProfile = async (req, res) => {
  /**
   *method to get user profile
   *@params {req,res}
   *@returns {res}
   */
  try {
    const user = await User.findById(req.authenticatedUser.id);
    if (!user) return res.status(500).send('User can\'t be found');
    delete user.password;
    console.log({ user });
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = getUserProfile;
