var INSTAGRAM_CLIENT_ID = "e1ed6191cd4b4db29892f07bd60250a1";
var INSTAGRAM_CLIENT_SECRET = "5619a5890c4741169a09dba46596c1b1";
var REDIRECT_URL = "http://localhost:1992/instagram/auth/callback";

var express = require('express');
var router = express.Router();
var request = require('request');
var passport = require('passport');
var InstagramStrategy = require('passport-instagram').Strategy;
var User = require('../models/user.js');
var addAccessCodeToUser = require('../public/js/add-access-code-to-user.js');

passport.use(new InstagramStrategy({
    clientID: INSTAGRAM_CLIENT_ID,
    clientSecret: INSTAGRAM_CLIENT_SECRET,
    callbackURL: REDIRECT_URL
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(accessToken);
    // asynchronous verification, for effect...
    //from the passport-instagram example
    // process.nextTick(function () {
    //   return done(null, profile);
    // });
  }
));

router.get('/auth', passport.authenticate('instagram'));

router.get('/auth/callback', function(req, res){
    var accessCode = req.query.code;
    var username = req.user.username;

    //form info to sent to instagram
    //instagram.com/developer/authentication/  //Step Three
    var options = {
      url: "https://api.instagram.com/oauth/access_token",
      //instagram specifically asks for a post method
      method: 'POST',
      json: true,
      form: {
          client_id : INSTAGRAM_CLIENT_ID,
          client_secret : INSTAGRAM_CLIENT_SECRET,
          grant_type: 'authorization_code',
          redirect_uri: REDIRECT_URL,
          code: accessCode
      }
    };

    //actualy sending the request to instagram
    request(options, function(err,res,body){
      console.log(body.access_token);
      var accessToken = body.access_token;
      //updating user info to include accessToken
      User.findOne({username: username}, function(err, user){
        if(err)console.log(err);

        //check if a code has already been aquired and added into user model
        //if not then add it to the user model
        addAccessCodeToUser(user, user.socialPlatforms, "instagram", accessToken);
      });
    });

    //redirect back to the users authorization page
    res.redirect('/' + req.user.username);
});

module.exports = router;
