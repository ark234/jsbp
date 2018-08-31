const User = require('../models/User');

const Users = {
  // Registration middleware
  register(req, res, next) {
    // Destructure properties out of request body
    const { username, password } = req.body;
    User.create({ username, password })
      .then(createdUser => {
        console.log('User registered successfully.');
        res.locals.createdUser = createdUser;
        next(); // always call next if chaining middleware
      })
      .catch(err => {
        console.error('Error in Users.register ===>', err);
        next(err); // Jump to our error handling middleware
      });
  },

  // Login middleware
  login(req, res, next) {
    const { username, password } = req.body;
    User.findOne({ username })
      .then(foundUser => {
        if (password === foundUser.password) {
          console.log('User logged in successfully.');
          res.locals.foundUser = foundUser;
          next();
        } else {
          console.log('User entered wrong password.');
          res.sendStatus(401);
        }
      })
      .catch(err => {
        console.error('Error in Users.login ===>', err);
        next(err);
      });
  }
};

module.exports = Users;
