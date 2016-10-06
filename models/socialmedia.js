var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var SocialSchema = new Schema({
  accessToken: String,
  username: String,
  socialName: String
});

SocialSchema.plugin(passportLocalMongoose);
var SocialModel = mongoose.model('Socialmedia', SocialSchema);

module.exports = {
  model: SocialModel,
  schema: SocialSchema
};
