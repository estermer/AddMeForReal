var express = require('express');
var router = express.Router();
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/user.js');
var addAccessCodeToUser = require('../public/js/add-access-code-to-user.js');

var TWITTER_CONSUMER_KEY = "nDmyK0cdIv5PPhgjfVvaQhMBZ";
var TWITTER_CONSUMER_SECRET = "QilHBSnd22V1ggFDltKlRanNL5oHTHtY1ZNHjEuDtkFaEufnz8";

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:1992/twitter/auth/callback"
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
    var username = req.user.username
    User.findOne({username: username}, function(err, user){
      if(err)console.log(err);

      //check if a code has already been aquired and added into user model
      //if not then add it to the user model
      addAccessCodeToUser(user, user.socialPlatforms, "twitter", req.query.code);

      res.redirect('/' + req.user.username);
    });
});

module.exports = router;
