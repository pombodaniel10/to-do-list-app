const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const tasks = require("../routes/tasks");
const users = require("../routes/users");
const app = express();
const compression = require('compression');
const helmet = require('helmet');

var distDir = '../../public/';

app.use(express.static(path.join(__dirname, distDir)));
app.use('/', express.static(path.join(__dirname, distDir)));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(compression()); 

app.use('/tasks', tasks);

app.use('/users',users);

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});

module.exports = app;