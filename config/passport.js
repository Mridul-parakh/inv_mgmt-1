const OutlookStrategy=require('passport-outlook');
const User =require('../app/v2/User/model');
const jwt=require('json-web-token');
const {SECRET,CLIENT_ID,CLIENT_SECRET,CALLBACKURL}=process.env;

module.exports=passport=>{passport.use(new OutlookStrategy({
    clientID: CLIENT_ID,
     clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACKURL
  },
  function(accessToken, refreshToken, profile, done) {
    var user = {
      outlookId: profile.id,
      name: profile.DisplayName,
      email: profile.EmailAddress,
      accessToken:  accessToken
    };
    if (refreshToken)
      user.refreshToken = refreshToken;
    if (profile.MailboxGuid)
      user.mailboxGuid = profile.MailboxGuid;
    if (profile.Alias)
      user.alias = profile.Alias;
      jwt.decode(SECRET,refreshToken,(err,payload,header)=>{
        User.findOne({email_id:profile._json.EmailAddress}).lean()
        .exec(function(err,user){
          if(err){
            console.log(err);
                return done(err,null);
          }else if(user){
            jwt.encode(SECRET,user,function(err,user){
              return done(err,user);
            })
          }
        })

      })


    
    // return done(refreshToken)
  }
));
}