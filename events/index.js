const EventEmitter = require('events');
const { BlockChain, AllChains } = require('../services/blockchain');

class BlockChainEmitter extends EventEmitter {}

const blockChainEmitter = new BlockChainEmitter();

blockChainEmitter.on('start_election', electionId => {
  //create block chain
  const newChain = new BlockChain();
  // create genesis block
  newChain.createGenesisBlock();
  //store chain
  AllChains[electionId] = newChain;
});

module.exports = blockChainEmitter;
