const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
      type: String,
      required: true,
      default: 'Open'
  },
  assignedTo:{
      type: String,
      required: true,
      default: 'None'
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

const Task = module.exports = mongoose.model('Task',TaskSchema);

module.exports.getTaskById = function(id,callback){
    Task.findById(id,callback);
}

module.exports.addTask = function(newTask,callback){
    newTask.save(callback);
}

module.exports.deleteTask = function(id,callback){
    Task.deleteOne({"_id":id},callback);
}

module.exports.editTask = function(id,editTask,callback){
  const filter = {"_id":id};
  Task.updateOne(filter, editTask, callback);
}