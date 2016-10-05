/// GET ADDME APP INITIALLY DESIGNED AT BIGRED HACKS ///

///CONTRIBUTERS: Jonathan Grant, Eric Stermer.
/******************************************************/


/************PACKAGES**********************************/
var util = require('util');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var passport = require('passport');
/******************************************************/

/*********************External Files*******************/
var User = require('./models/user.js');
/******************************************************/

/*************Mongoose*********************************/
mongoose.connect('mongodb://localhost/addme');
mongoose.Promise = global.Promise;
/******************************************************/

/*************Strategies*********************************/
var LocalStrategy = require('passport-local').Strategy;
/******************************************************/

/**************EXPRESS*********************************/
var express = require('express');
var app = express();
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use( bodyParser.json() );    // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({  // to support URL-encoded bodies
  extended: true
}));
/*********************HANDLEBARS******************/
var hbs = require('hbs');
app.set('view engine', 'hbs');
app.set('views', './views')
/******************************************************/

/**************PASSPORT CONFIGURATION******************/
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
/******************************************************/

/**********************Controllers***********************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var instagramController = require('./controllers/instagram.js');
var githubController = require('./controllers/github.js');
var youtubeController = require('./controllers/youtube.js');
var pinterestController = require('./controllers/pinterest.js');
app.use('/instagram', instagramController);
app.use('/github', githubController);
app.use('/youtube', youtubeController);
app.use('/pinterest', pinterestController);
/******************************************************/



/**************FRONTEND RENDERING**********************/

//HOME
app.get('/', function(req, res){
  res.render('home');
});

//USER-HOME
app.get('/:username', function(req, res){
  //making sure user cannot access his account unless authorized
  if (!req.user || req.user.username != req.params.username) {
    res.redirect('/');
  } else {
    User.findOne({username: req.params.username}, function(err, user){
      if(err) console.log(err);
      console.log(user);
      res.render('index', {
        user: req.params.username
      });
    })
  }
});

//SIGNUP
app.post('/signup', function(req, res){
  User.register(new User({
    username: req.body.username
  }),
  req.body.password,
  function(err, user){
    if(err) res.redirect('/');
    //auto login after signup
    req.login(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/' + req.user.username);
    });
  });
});

//LOGIN
app.post('/login', passport.authenticate('local'), function(req, res){
  res.redirect('/' + req.user.username);
});

//LOGOUT
app.delete('/logout', function(req, res){
  req.logout();
  //redirects to the home to login or register
  res.redirect('/');
});

/******************************************************/


/*****************SERVER************************************/

var port = process.env.PORT || 1992

app.listen(port, function () {

  console.log("Server listening at port " + port);

});
