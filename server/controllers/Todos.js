const { User, Todo } = require('../models/User');

const Todos = {
  // Middleware for adding todo to user's todoList
  createTodo(req, res, next) {
    const { userId, text } = req.body;
    // Create new todo instance
    const todo = new Todo({ text });
    // Find user by id
    User.findById(userId)
      .then(foundUser => {
        // Add newly created todo to user's todoList
        foundUser.todoList.push(todo);
        // Save modified user to MongoDB
        foundUser.save().then(savedUser => {
          console.log('Todo successfully added.');
          res.locals.savedUser = savedUser;
          next(); // Always invoke next() to call next middleware
        });
      })
      .catch(err => {
        console.error('Error in Todos.createTodo ===>', err);
        next(err);
      });
  },
  // Middleware for retrieving user's todoList
  getTodos(req, res, next) {},
  // Middleware for updating todo in user's todoList
  updateTodo(req, res, next) {},
  // Middleware for deleting todo in user's todoList
  deleteTodo(req, res, next) {}
};

module.exports = Todos;
