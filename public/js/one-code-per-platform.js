/*Function to only allow one access token*/
/*to the users file per social media platform*/

var oneCodePerPlatform = function(socialPlatforms, socialMediaName){
  var bool = false;
  for(var i = 0; i < socialPlatforms.length; i++){
    if(socialPlatforms[i].socialName === socialMediaName){
      bool = true;
    }
  }
  return bool;
};

module.exports = oneCodePerPlatform;
