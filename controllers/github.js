var GITHUB_CLIENT_ID = "89221658f77bf282f490";
var GITHUB_CLIENT_SECRET = "11f6d9c96c884834e4d3c4cfc0b8cd5c32231c52";
var REDIRECT_URL = "http://localhost:1992/github/auth/callback";

var express = require('express');
var router = express.Router();
var passport = require('passport');
var request = require('request');
var GitHubStrategy = require('passport-github2').Strategy;
var User = require('../models/user.js');
var addAccessCodeToUser = require('../public/js/add-access-code-to-user.js');


passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: REDIRECT_URL
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));

router.get('/auth', passport.authenticate('github'));

router.get('/auth/callback', function(req, res){
  var accessCode = req.query.code;
  var username = req.user.username;

  var options = {
    url: "https://github.com/login/oauth/access_token",
    method: 'POST',
    json: true,
    form: {
        client_id : GITHUB_CLIENT_ID,
        client_secret : GITHUB_CLIENT_SECRET,
        redirect_uri: REDIRECT_URL,
        code: accessCode
    }
  };

  //actualy sending the request to instagram
  request(options, function(err,res,body){
    console.log(body);
    var accessToken = body.access_token;

    //updating user info to include accessToken
    User.findOne({username: username}, function(err, user){
      if(err)console.log(err);

      //check if a code has already been aquired and added into user model
      //if not then add it to the user model
      addAccessCodeToUser(user, user.socialPlatforms, "github", accessToken);

    });
  });


  res.redirect('/' + req.user.username);
});

module.exports = router;
