const Elections = require('../models/election');
const Vote = require('../models/vote');
const BlockChain = require('../../services/blockchain');

const currentElections = (req, res) => {
  Elections.find({ status: 'in-progress' })
    .then(res =>
      res
        .status(200)
        .send({ msg: 'Current elections fetched successfully', data: res })
    )
    .catch(err => res.status(500).send({ msg: 'An Error occured', err }));
};

const voteForCandidate = (req, res) => {};

module.exports = {
  currentElections,
  voteForCandidate
};
