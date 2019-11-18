const mongoose = require('mongoose');

const { Schema } = mongoose;

const voteSchema = new Schema({
  voter: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  candidate: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Candidate'
  },
  blockChain: {
    type: String
  }
});

module.exports = mongoose.model('Vote', voteSchema);
