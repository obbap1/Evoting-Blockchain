/* eslint-disable class-methods-use-this */
const crypto = require('crypto');

class Block {
  constructor(
    index,
    timestamp,
    data = { voterId: '', candidateId: '' },
    previousHash = ''
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    const hash = crypto.createHash('sha256');
    hash.update(
      `${this.index} ${this.previousHash} ${this.timestamp} ${
        this.data ? JSON.stringify(this.data) : 'Genesis Block'
      } ${this.nonce}`
    );
    const finalHash = hash.digest('hex');
    return finalHash;
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce += 1;
      this.hash = this.calculateHash();
    }
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 3;
  }

  createGenesisBlock() {
    return new Block(0, new Date().toISOString(), null, '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i += 1) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  getChain() {
    return this.chain;
  }
}

const votingChain = new BlockChain();

module.exports = {
  votingChain,
  Block,
  AllChains
};
