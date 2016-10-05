var codeAlreadyExists = require('./one-code-per-platform.js');


var addAccessCodeToUser = function(user, socialPlatforms, socialName, code){
  if(!codeAlreadyExists(socialPlatforms, socialName)){
    user.socialPlatforms.push({
      accessToken: code,
      socialName: socialName
    });
    user.save(function(err){
      if(err)console.log(err);
    });
  }
};

module.exports = addAccessCodeToUser;
