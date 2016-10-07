/*A Function designed to search the
users profile for a specified social
platform and return the platforms data*/

var findSocialPlatformData = function(user, socialName){
  var socialPlatform;

  for( var i = 0; i < user.socialPlatforms.length; i ++){
    if(user.socialPlatforms[i]["socialName"] === socialName){
      socialPlatform = user.socialPlatforms[i];
    }
  }

  return socialPlatform;
};

module.exports = findSocialPlatformData;
