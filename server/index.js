// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

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

// Default route handler
app.get('/', (req, res) => res.send('Hello from Express!'));

// Start server
app.listen(PORT, HOST, () => console.log(`Server started on ${HOST}:${PORT}`));
