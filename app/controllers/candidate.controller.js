const Candidate = require('../models/candidate');
const User = require('../models/user');

const registerForElection = (req, res) => {
  const { id } = req.params;

  const candidate = new Candidate({
    election: id,
    candidate: req.authenticatedUser._id
  });

  candidate
    .save()
    .then(async () => {
      try {
        // Add it to the user's history
        await User.findByIdAndUpdate(
          { _id: req.authenticatedUser._id },
          {
            $push: {
              elections: id
            }
          }
        );
      } catch (err) {
        return res.status(500).send({ msg: 'An Error occured', err });
      }
    })
    .catch(err =>
      res.status(500).send({
        msg: 'Saving this candidate for this election failed',
        err
      })
    );
};

module.exports = {
  registerForElection
};
