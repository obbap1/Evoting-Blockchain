const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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

const User = mongoose.model('User', userSchema);

module.exports = User;
