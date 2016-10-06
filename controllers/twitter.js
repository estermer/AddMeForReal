var TWITTER_CONSUMER_KEY = "nDmyK0cdIv5PPhgjfVvaQhMBZ";
var TWITTER_CONSUMER_SECRET = "QilHBSnd22V1ggFDltKlRanNL5oHTHtY1ZNHjEuDtkFaEufnz8";
var REDIRECT_URL = "http://localhost:1992/twitter/auth/callback";

var express = require('express');
var router = express.Router();
var passport = require('passport');
var request = require('request');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/user.js');
var addAccessCodeToUser = require('../public/js/add-access-code-to-user.js');


passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: REDIRECT_URL
  },
  function(token, tokenSecret, profile, cb) {
    // asynchronous verification, for effect...
    //from the passport-instagram example
    // process.nextTick(function () {
    //   return done(null, profile);
    // });
  }
));

router.get('/auth', passport.authenticate('twitter'));

router.get('/auth/callback', function(req, res){
    // var accessCode = req.query.oauth_token;//8QwsFgAAAAAAxUB7AAABV5gNS7Y
    // var verifier = req.query.oauth_verifier;
    // var username = req.user.username;
    console.log(req.query);


    // User.findOne({username: username}, function(err, user){
    //   if(err)console.log(err);
    //   console.log(req.query);
    //   //check if a code has already been aquired and added into user model
    //   //if not then add it to the user model
    //   addAccessCodeToUser(user, user.socialPlatforms, "twitter", req.query.oauth_token);
    //
    //   res.redirect('/' + req.user.username);
    // });
});

module.exports = router;
