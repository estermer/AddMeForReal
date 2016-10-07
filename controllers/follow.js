var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../models/user.js');
var findSocialPlatformData = require('../public/js/find-social-platform.js');

router.get('/:username', function(req, res){
  User.findOne({username: req.params.username}, function(err, user){
    //create a request route for each social media

    //GITHUB
    var githubPlatform = findSocialPlatformData(user, "github");
    var githubOptions = {
      url: "https://api.github.com/user/following/" + githubPlatform.username,
      method: "PUT",
      headers: {
        "User-Agent": "AddMe",
        "Content-Length": 0,
        "Authorization": "token " + githubPlatform.accessToken
      }
    };

    request(githubOptions, function(err, response, body){
      console.log(githubPlatform.username + " friended!");
    });

    var instagramPlatform = findSocialPlatformData(user, "instagram");
    var instagramOptions = {
      url: "https://api.instagram.com/v1/users/"+instagramPlatform.username+"/relationship?action=follow",
      method: "POST",
      headers: {
        "User-Agent": "AddMe",
        "Content-Length": 0,
        "Authorization": "token " + instagramPlatform.accessToken
      }
    };

    request(instagramOptions, function(err, response, body){
      console.log(instagramPlatform.username + " friended!");
    });

    res.redirect('/' + req.params.username);
  });
});


module.exports = router;
