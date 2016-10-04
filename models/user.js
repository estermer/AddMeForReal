var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
var Social = require('../models/socialmedia.js');

var UserSchema = new Schema({
  username: String,
  password: String,
  createdAt: Date,
  updatedAt: Date,
  socialPlatforms: [Social.schema],
  key: String

  /*
  userID: String //for the QR code or personal link
  //store oauth codes
  */
});

// this will set the conditions for the created and update timestamps
UserSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});
//

UserSchema.plugin(passportLocalMongoose);
var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
