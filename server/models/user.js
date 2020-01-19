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

module.exports.findUserbyName = function(name,callback){
    User.findOne({name:name},callback);
}

module.exports.deleteUser = function(id,callback){
    User.deleteOne({"_id":id},callback);
}