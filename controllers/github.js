var express = require('express');
var router = express.Router();
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var User = require('../models/user.js');

var GITHUB_CLIENT_ID = "89221658f77bf282f490";
var GITHUB_CLIENT_SECRET = "11f6d9c96c884834e4d3c4cfc0b8cd5c32231c52";

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:1992/github/auth/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));

router.get('/auth', passport.authenticate('github'));

router.get('auth/callback', function(req, res){

});

module.exports = router;
