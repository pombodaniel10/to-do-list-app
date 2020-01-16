"use strict"
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/add',(req,res) => {
    let newUser = new User({
        name: req.body.name,
    });
    User.addUser(newUser,(err,user) =>{
        if(err){
            res.json({"success":false, "msg":'Error while trying to add user.'});
        }else{
            res.json({"success":true, "msg":'User added.'});
        }
    });
    
});

router.get('/getAll', (req,res) => {
    User.find((err,users) => {
        if(err) throw err;
        if(!users){
          return res.json({"success":false, "msg": 'Not users founded.'});
        } else {
          return res.json(users);
        }
    });
});

module.exports = router;