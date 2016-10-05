var express = require('express');
var router = express.Router();
var passport = require('passport');
var PinterestStrategy = require('passport-pinterest').Strategy;
var User = require('../models/user.js');
var addAccessCodeToUser = require('../public/js/add-access-code-to-user.js');

var PINTEREST_APP_ID = "4860479268236313660";
var PINTEREST_APP_SECRET = "8cc6bcb94a7a5075de5348d19160962d6d3d7fc04ca64603b14c115ed1e0f22e";

passport.use(new PinterestStrategy({
        clientID: PINTEREST_APP_ID,
        clientSecret: PINTEREST_APP_SECRET,
        scope: ['write_relationships'],
        callbackURL: "https://localhost:3000/pinterest/auth/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ pinterestId: profile.id }, function (err, user) {
        //     return done(err, user);
        // });
    }
));

router.get('/auth', passport.authenticate('pinterest'));

router.get('/auth/callback', function(req, res){
    var username = req.user.username
    User.findOne({username: username}, function(err, user){
      if(err)console.log(err);

      //check if a code has already been aquired and added into user model
      //if not then add it to the user model
      addAccessCodeToUser(user, user.socialPlatforms, "pinteerest", req.query.state);

      res.redirect('/' + req.user.username);
    });
});

module.exports = router;


module.exports = router;
