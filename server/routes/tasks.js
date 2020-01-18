"use strict"
const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const User = require('../models/user');


router.post('/add',(req,res) => {
    let status;
    if(req.body.assignedTo!="None"){ 
        status = "In-Progress";
        User.findUserbyName(req.body.assignedTo,(err,user)=>{
            if(err){
                console.log(err);
            }else{
                User.updateOne({_id:user._id},{$push: {"assignedTasks": req.body.name}}, (err,callback) =>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log(callback);
                    }
                });
            }
        });
    }else{
        status = "Open";
    }
    
    let newTask = new Task({
        name: req.body.name,
        description: req.body.description,
        status: status,
        assignedTo: req.body.assignedTo
    });
    Task.addTask(newTask,(err,task) =>{
        if(err){
            res.json({"success":false, "msg":'Error while trying to add Task.'});
        }else{
            res.json({"success":true, "msg":'Task added.'});
        }
    });
    
});

router.put('/edit/:id',(req,res) => {
    let editTask = {
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        assignedTo: req.body.assignedTo
    };
    if(editTask.status=="In-Progress"||editTask.status=="Completed"){
        User.findUserbyName(req.body.assignedTo,(err,user)=>{
            if(err){
                console.log(err);
            }else{
                User.updateOne({_id:user._id},{$push: {"assignedTasks": req.body.name}}, (err,callback) =>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log(callback);
                    }
                });
            }
        });
    }else if(editTask.status=="Open"){
        User.findUserbyName(req.body.assignedTo,(err,user)=>{
            if(err){
                console.log(err);
            }else{
                User.updateOne({_id:user._id},{$pull: {"assignedTasks": req.body.name}}, (err,callback) =>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log(callback);
                    }
                });
            }
        });
        editTask.assignedTo = "None";
    }
    Task.editTask(req.params.id,editTask,(err,task) =>{
        if(err){
            console.log(err);
            res.json({"success":false, "msg":'Error while trying to update the task.'});
        }else{
            res.json({"success":true, "msg":'Task updated.'});
        }
    })
});

router.get('/getAll', (req,res) => {
    Task.find((err,tasks) => {
        if(err) throw err;
        if(!tasks){
          return res.json({"success":false, "msg": 'Not tasks founded.'});
        } else {
          return res.json(tasks);
        }
    });
});

router.get('/:id',(req,res)=>{
    Task.getTaskById(req.params.id,(err,task) => {
        if(err){
            res.json({"success":false, "msg":'Error while trying to find the task.'});
        }
        if(!task){
            res.json({"success":false, "msg":'Theres no task with that id.'});
        }else{
            res.json(task);
        }
    });
});

router.delete('/delete/:id',(req,res)=>{
    Task.deleteTask(req.params.id,(err,task) => {
        if(err){
            res.json({"success":false, "msg":'Error while trying to delete the task.'});
        }
        if(task){
            res.json({"success":true, "msg":'Task deleted.'});
        }
    });
  });

module.exports = router;