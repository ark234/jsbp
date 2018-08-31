// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');

// Import local dependencies
const userController = require('./controllers/Users');

// Mongoose configuration
mongoose.Promise = global.Promise; // Allows use of native promises with mongoose
mongoose
  .connect(
    process.env.DB_URI, // DB URI from .env file
    { useNewUrlParser: true } // Resolves deprecation warning
  )
  .then(console.log('Connected to database.'));

// Express server configuration
const app = express(); // create application instance
const HOST = process.env.HOST || 'localhost'; // process.env.HOST for production, localhost for dev
const PORT = process.env.PORT || 3000;

// Configure body-parser
// Only allow strings and arrays encoded in request body
app.use(bodyParser.urlencoded({ extended: false }));
// Convert request body into JSON object
app.use(bodyParser.json());

// Default route handler
app.get('/', (req, res) => res.send('Hello from Express!'));

// Register route
app.post('/register', userController.register, (req, res) => {
  res.json(res.locals.createdUser);
});

// Login route
app.post('/login', userController.login, (req, res) => {
  res.json(res.locals.foundUser);
});

// Start server
app.listen(PORT, HOST, () => console.log(`Server started on ${HOST}:${PORT}`));
