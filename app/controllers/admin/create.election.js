const Election = require('../../models/election');

const createElection = async (req, res) => {
  const election = new Election({
    name: req.body.name.toLowerCase().trim(),
  });

  await election.save((err) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send('Election has been registered');
  });
};

module.exports = createElection;
