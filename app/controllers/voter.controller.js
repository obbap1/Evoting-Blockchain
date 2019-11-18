const Election = require('../models/election');
const Vote = require('../models/vote');
const { Block, AllChains } = require('../../services/blockchain');
const Candidate = require('../models/candidate');
const BlockChainModel = require('../models/blockchain');

const currentElections = (req, res) => {
  Election.find({ status: 'in-progress' })
    .then(data =>
      res
        .status(200)
        .send({ msg: 'Current elections fetched successfully', data })
    )
    .catch(err => res.status(500).send({ msg: 'An Error occured', err }));
};

const voteForCandidate = (req, res) => {
  try {
    const { id } = req.params;

    const voteObj = {
      voter: req.authenticatedUser._id,
      candidate: id
    };

    const vote = new Vote(voteObj);

    vote
      .save()
      .then(async () => {
        res.status(200).send({ msg: 'Vote was successfully!', data: null });

        // create new block

        const { election = '' } = await Candidate.findById(id).select(
          'election'
        );

        if (election) {
          const block = new Block(0, new Date().toISOString(), voteObj, '');

          const electionChain = AllChains[election];

          electionChain.addBlock(block);

          await BlockChainModel.findByIdAndUpdate(
            { election },
            {
              update: {
                $push: {
                  chain: electionChain || 'NO_CHAIN'
                }
              }
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
          );

          console.log('done');
        }
      })
      .catch(err => {
        console.log({ err });
        res.status(500).send({ msg: 'An Error occured', err });
      });
  } catch (err) {
    console.log({ err });
    return res.status(500).send({ msg: 'An Error occured', err });
  }
};

module.exports = {
  currentElections,
  voteForCandidate
};
