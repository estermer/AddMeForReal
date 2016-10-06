var LINKEDIN_API_KEY = "787mdoc8d03y8m";
var LINKEDIN_SECRET_KEY = "DrVs8FUxw8wHbxNA";
var REDIRECT_URI = "http://localhost:1992/linkedin/auth/callback";

var express = require('express');
var app = express();
var router = express.Router();
var Linkedin = require('node-linkedin')(LINKEDIN_API_KEY, LINKEDIN_SECRET_KEY, REDIRECT_URI);
var linkedin = Linkedin.init('my_access_token');
var User = require('../models/user.js');
var addAccessCodeToUser = require('../public/js/add-access-code-to-user.js');



router.get('/auth', function(req, res){
  //authorizees and redirects response which contains thte redirect uri
  Linkedin.auth.authorize(res);
});

router.get('/auth/callback', function(req, res){
    var username = req.user.username;
    //getting the access token using the oauth_code and oauth_state gathered in the request
    Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function(err, results) {
        if ( err )
            return console.error(err);
        console.log(results);

        //find user and input and save the access_token
        User.findOne({username: username}, function(err, user){
          if(err)console.log(err);
          console.log(req.query);
          //check if a code has already been aquired and added into user model
          //if not then add it to the user model
          addAccessCodeToUser(user, user.socialPlatforms, "linkedin", results.access_token);
        });

        console.log(results.access_token);
        return res.redirect('/' + req.user.username);
    });
});

module.exports = router;
