// model/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
