const mongoose = require("mongoose");

const { Schema } = mongoose;

const candidateSchema = new Schema({
  election: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Election"
  },
  candidate: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
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

module.exports = mongoose.model("Candidate", candidateSchema);
