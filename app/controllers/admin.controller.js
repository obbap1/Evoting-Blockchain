const Election = require("../models/election");
const Vote = require("../models/vote");
const { returnLowerCase, trim } = require("../helpers/utils");

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
        .send({ msg: "This election has been registered", data: null })
    )
    .catch(err => res.status(500).send({ msg: "An Error occured", err }));
};

const changeElectionStatus = (status = "in-progress", msg = "started") => {
  return (req, res) => {
    const { id } = req.params;
    Election.findByIdAndUpdate({ _id: id }, { status })
      .then(() => {
        return res
          .status(200)
          .send({ msg: `This Election has ${msg}!`, data: null });
      })
      .catch(err => {
        return res.status(500).send({ msg: "An Error occured", err });
      });
  };
};

const getElections = (req, res) => {
  const query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }
  Election.find(query)
    .then(result =>
      res
        .status(200)
        .send({ msg: "Elections were fetched successfully", data: result })
    )
    .catch(err => res.status(500).send({ msg: "An Error occured", err }));
};

const getBlockChain = (req, res) => {
  const { id } = req.params;

  Vote.find({ electionId: id })
    .then(res => {
      const blockChain = res.map(x => x.blockChain);
      return res
        .status(200)
        .send({ msg: "Block chain fetched successfully", data: blockChain });
    })
    .catch(err => res.status(500).send({ msg: "An Error occured", err }));
};

module.exports = {
  createElection,
  changeElectionStatus,
  getElections,
  getBlockChain
};
