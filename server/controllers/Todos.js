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
  getTodos(req, res, next) {
    const userId = req.body.userId;
    User.findById(userId)
      .then(foundUser => {
        console.log('User todos found ===>', foundUser.todoList);
        res.locals.todoList = foundUser.todoList;
        next();
      })
      .catch(err => {
        console.error('Error in Todos.getTodos ===>', err);
        next(err);
      });
  },
  // Middleware for updating todo in user's todoList
  updateTodo(req, res, next) {
    const { userId, todoId, text } = req.body;
    User.findById(userId)
      .then(foundUser => {
        // for of loop allows us to break once we find matching todo
        for (let todo of foundUser.todoList) {
          if (todo._id === todoId) {
            todo.text = text;
            foundUser.save().then(savedUser => {
              console.log('User todo updated successfully.');
              res.locals.savedUser = savedUser;
              next();
            });
            break;
          }
        }
      })
      .catch(err => {
        console.error('Error in Todos.updateTodo ===>', err);
        next(err);
      });
  },
  // Middleware for deleting todo in user's todoList
  deleteTodo(req, res, next) {}
};

module.exports = Todos;
