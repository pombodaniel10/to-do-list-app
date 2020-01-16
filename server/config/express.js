const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const tasks = require("../routes/tasks");
const users = require("../routes/users");
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/tasks', tasks);

app.use('/users',users);

module.exports = app;