const mongoose = require('mongoose');

const { Schema } = mongoose;

const voteSchema = new Schema({
  voter: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  candidate: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  passport: {
    type: String,
  },
  type: {
    type: String,
    default: 'voter',
  },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
