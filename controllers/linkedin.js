var express = require('express');
var router = express.Router();
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;
var User = require('../models/user.js');
var addAccessCodeToUser = require('../public/js/add-access-code-to-user.js');

var LINKEDIN_API_KEY = "787mdoc8d03y8m";
var LINKEDIN_SECRET_KEY = "DrVs8FUxw8wHbxNA";

passport.use(new LinkedInStrategy({
    consumerKey: LINKEDIN_API_KEY,
    consumerSecret: LINKEDIN_SECRET_KEY,
    callbackURL: "http://localhost:1992/linkedin/auth/callback"
  },
  function(token, tokenSecret, profile, done) {
    // User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));

router.get('/auth', passport.authenticate('linkedin'));

router.get('/auth/callback', function(req, res){
    var username = req.user.username
    User.findOne({username: username}, function(err, user){
      if(err)console.log(err);

      //check if a code has already been aquired and added into user model
      //if not then add it to the user model
      addAccessCodeToUser(user, user.socialPlatforms, "linkedin", req.query.code);

      res.redirect('/' + req.user.username);
    });
});

module.exports = router;
