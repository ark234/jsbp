const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema defining our todo model
const todoSchema = new Schema({
  text: { type: String, required: true },
  isDone: { type: Boolean, default: false }
});

// Schema defining our User model
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todoList: [todoSchema]
});

// Create models for export
const User = mongoose.model('User', userSchema);
const Todo = mongoose.model('Todo', todoSchema);

// Export models
module.exports = { User, Todo };
