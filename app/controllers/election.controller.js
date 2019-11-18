const Election = require('../models/election');
const User = require('../models/user');

const getHistory = async (req, res) => {
  try {
    const { elections } = await User.findById(req.authenticatedUser._id);
    console.log({ elections });
    let names = elections.map(x => Election.findById(x));
    names = await Promise.all(names);
    console.log({ names });
    return res
      .status(200)
      .send({ msg: 'History fetched successfully', data: names });
  } catch (err) {
    return res.status(500).send({ msg: 'An Error Occured', err });
  }
};

module.exports = {
  getHistory
};
