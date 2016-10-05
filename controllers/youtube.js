var express = require('express');
var router = express.Router();
var passport = require('passport');
var YoutubeV3Strategy = require('passport-youtube-v3').Strategy;
var User = require('../models/user.js');
var addAccessCodeToUser = require('../public/js/add-access-code-to-user.js');

var YOUTUBE_CLIENT_ID = "1033837139381-254vohtgjnaeefqs99hfptlvdrqj3ir6.apps.googleusercontent.com";
var YOUTUBE_CLIENT_SECRET = "ii1a0hdJFZyqgyXZkMx9GNiX";

passport.use(new YoutubeV3Strategy({
    clientID: YOUTUBE_CLIENT_ID,
    clientSecret: YOUTUBE_CLIENT_SECRET,
    callbackURL: "http://localhost:1992/youtube/auth/callback",
    scope: ['https://www.googleapis.com/auth/youtube']
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ userId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));

router.get('/auth', passport.authenticate('youtube'));

router.get('/auth/callback', function(req, res){
    var username = req.user.username
    User.findOne({username: username}, function(err, user){
      if(err)console.log(err);

      //check if a code has already been aquired and added into user model
      //if not then add it to the user model
      addAccessCodeToUser(user, user.socialPlatforms, "youtube", req.query.code);

      res.redirect('/' + req.user.username);
    });
});

module.exports = router;
