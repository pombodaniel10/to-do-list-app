const mongoose = require('mongoose');

//Connect to database
mongoose.connect(process.env.MONGO_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

//On connection
mongoose.connection.on('connected', () => {
  console.log("Connected to database ");
});

//Error connection
mongoose.connection.on('error', (err) => {
  console.log("Database error: "+err);
});

module.exports = mongoose;