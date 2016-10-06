var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

router.get('/:username', function(req, res){
  User.findOne({username: req.params.username}, function(err, user){
    //create a request route for each social media
    //create 2 functions that will search the user and return the username and access code
  });
});


module.exports = router;
