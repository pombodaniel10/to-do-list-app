const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  assignedTasks: {
      type: [String]
  }
});

const User = module.exports = mongoose.model('User',UserSchema);

module.exports.addUser = function(newUser,callback){
    newUser.save(callback);
}
