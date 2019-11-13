const mongoose = require("mongoose");

const { Schema } = mongoose;

const electionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ["completed", "in-progress", "waiting"],
    default: "waiting"
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

module.exports = mongoose.model("Election", electionSchema);
