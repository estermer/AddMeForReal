var YOUTUBE_CLIENT_ID = "1033837139381-254vohtgjnaeefqs99hfptlvdrqj3ir6.apps.googleusercontent.com";
var YOUTUBE_CLIENT_SECRET = "ii1a0hdJFZyqgyXZkMx9GNiX";
var REDIRECT_URL = "http://localhost:1992/youtube/auth/callback";

var express = require('express');
var router = express.Router();
var passport = require('passport');
var YoutubeV3Strategy = require('passport-youtube-v3').Strategy;
var request = require('request');
var requestp = require('request-promise');
var User = require('../models/user.js');
var addAccessCodeToUser = require('../public/js/add-access-code-to-user.js');


passport.use(new YoutubeV3Strategy({
    clientID: YOUTUBE_CLIENT_ID,
    clientSecret: YOUTUBE_CLIENT_SECRET,
    callbackURL: REDIRECT_URL,
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
    var accessCode = req.query.code;
    var username = req.user.username

    //Options to send request to youtube for accessToken
    var options = {
      url: "https://accounts.google.com/o/oauth2/token",
      method: 'POST',
      json: true,
      form: {
          client_id : YOUTUBE_CLIENT_ID,
          client_secret : YOUTUBE_CLIENT_SECRET,
          grant_type: 'authorization_code',
          redirect_uri: REDIRECT_URL,
          code: accessCode
      }
    };

    //First request is for youtube accessToken
    requestp(options)
    .then(function(body){
      return body.access_token;
    })
    .then(function(accessToken){
      console.log(accessToken);

      //options needed to request the userData including username
      var userOptions = {
        url: "https://www.googleapis.com/youtube/v3/channels?part=id&mine=true&access_token=" + accessToken,
        method: "GET",
        json: true,
        headers: {
          "User-Agent": "AddMe",
        }
      };

      //UserData request
      requestp(userOptions)
      .then (function(body){
        console.log(body.items[0].id);

        //updating user info to include accessToken
        // User.findOne({username: username}, function(err, user){
        //   if(err)console.log(err);
        //
        //   //check if a code has already been aquired and added into user model
        //   //if not then add it to the user model
        //   addAccessCodeToUser(user, user.socialPlatforms, "youtube", accessToken);
        //
        // });
      });

    });

    res.redirect('/' + req.user.username);
});

module.exports = router;
