const Election = require('../models/election');
const Vote = require('../models/vote');
const { returnLowerCase, trim } = require('../helpers/utils');
const blockChainEmitter = require('../../events/index');

const createElection = (req, res) => {
  const { name } = req.body;
  const election = new Election({
    name: returnLowerCase(trim(name))
  });

  election
    .save()
    .then(() =>
      res
        .status(200)
        .send({ msg: 'This election has been registered', data: null })
    )
    .catch(err => res.status(500).send({ msg: 'An Error occured', err }));
};

const changeElectionStatus = (status = 'in-progress', msg = 'started') => {
  return (req, res) => {
    const { id } = req.params;
    blockChainEmitter.emit('start_election', id);
    Election.findByIdAndUpdate({ _id: id }, { status })
      .then(() => {
        return res
          .status(200)
          .send({ msg: `This Election has ${msg}!`, data: null });
      })
      .catch(err => {
        return res.status(500).send({ msg: 'An Error occured', err });
      });
  };
};

const getElections = (req, res) => {
  const query = {};
  if (req.query.id) {
    query._id = req.params.id;
  }
  Election.find(query)
    .then(data =>
      res.status(200).send({ msg: 'Elections were fetched successfully', data })
    )
    .catch(err => res.status(500).send({ msg: 'An Error occured', err }));
};

const getVotes = (req, res) => {
  Vote.find({})
    .populate('voter')
    .populate('candidate')
    .then(data =>
      res.status(200).send({ msg: 'Votes were fetched successfully', data })
    );
};

const getElectionResults = async (req, res) => {
  // Get candidates with election id
  const { id } = req.params;

  const candidates = await Candidate.find({ electionId: id }).populate(
    'candidateId'
  );

  const results = candidates.map(x => Vote.find({ candidate: x._id }).count());

  const data = [await Promise.all(results), ...candidates];

  return res.status(200).send({ msg: 'Results fetched successfully', data });
};

const getBlockChain = (req, res) => {
  const { id } = req.params;

  Vote.find({ candidate: id })
    .then(response => {
      const data = response.map(x => x.blockChain);
      return res
        .status(200)
        .send({ msg: 'Block chain fetched successfully', data });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ msg: 'An Error occured', err });
    });
};

module.exports = {
  createElection,
  changeElectionStatus,
  getElections,
  getBlockChain,
  getVotes,
  getElectionResults
};
