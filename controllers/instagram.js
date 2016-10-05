var express = require('express');
var router = express.Router();
var passport = require('passport');
var InstagramStrategy = require('passport-instagram').Strategy;
var User = require('../models/user.js');
var codeAlreadyExists = require('../public/js/one-code-per-platform.js');

var INSTAGRAM_CLIENT_ID = "e1ed6191cd4b4db29892f07bd60250a1";
var INSTAGRAM_CLIENT_SECRET = "5619a5890c4741169a09dba46596c1b1";

passport.use(new InstagramStrategy({
    clientID: INSTAGRAM_CLIENT_ID,
    clientSecret: INSTAGRAM_CLIENT_SECRET,
    callbackURL: "http://localhost:1992/instagram/auth/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    //from the passport-instagram example
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

router.get('/auth', passport.authenticate('instagram'));

router.get('/auth/callback', function(req, res){
    console.log(req.query.code);
    var username = req.user.username
    User.findOne({username: username}, function(err, user){
      if(err)console.log(err);

      //check if a code has already been aquired and added into user model
      //if not then add it to the user model
      if(!codeAlreadyExists(user.socialPlatforms, "instagram")){
        user.socialPlatforms.push({
          accessCode: req.query.code,
          socialName: "instagram"
        });
        user.save(function(err){
          if(err)console.log(err);
        });
      }

      console.log(user);
      res.redirect('/' + req.user.username);
    });
});

module.exports = router;
