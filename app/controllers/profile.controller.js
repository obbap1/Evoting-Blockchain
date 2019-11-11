const User = require("../models/user");
const { transformUser } = require("../helpers/utils");

const getUserProfile = async (req, res) => {
  /**
   *method to get user profile
   *@params {req,res}
   *@returns {res}
   */
  try {
    const user = await User.findById(req.authenticatedUser._id);
    if (!user) return res.status(500).send("User can't be found");
    return res.status(200).json(transformUser(user));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = getUserProfile;
