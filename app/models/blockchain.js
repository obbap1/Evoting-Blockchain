const mongoose = require('mongoose');

const { Schema } = mongoose;

const blockChainSchema = new Schema({
  election: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Election'
  },
  chain: {
    type: Array,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Blockchain', blockChainSchema);
