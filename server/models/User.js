const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema defining our User model
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create user model
const User = mongoose.model('User', userSchema);

// Export user model
module.exports = User;
