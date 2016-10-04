var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var SocialSchema = new Schema({
  accessToken: String,
  key: String,
  socialName: String
});

SocialSchema.plugin(passportLocalMongoose);
var SocialModel = mongoose.model('User', SocialSchema);

module.exports = {
  model: SocialModel,
  schema: SocialSchema
};
