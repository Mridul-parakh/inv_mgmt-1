require('dotenv').config({path:'./config/credentials.env'});
const express = require('express')
const next = require('next');
const passport=require('passport');
require('./config/passport')(passport);
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();
const User =require('./app/v2/User/model');
const jwt=require('json-web-token')
    
const key=process.env.SECRET;



app.prepare()
.then(() => {
  const server = express()

// passport initialization steps
server.use(passport.initialize());
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
//-


// setup passport-outlook authentications
  server.get('/auth/login',
  passport.authenticate('windowslive', {
    scope: [
      'openid',
      'profile',
      'offline_access',
      'https://outlook.office.com/Mail.Read'
    ]
  })
);

server.get('/login', 
  passport.authenticate('windowslive', { failureRedirect: '/login' }),
  function(req, res) {
    // res.header('Authorization',req.user);  
    res.send(req.user)
  });
    
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
//-

// authorization for routes
function isAuthorized(req,res,next){
  let token = req.headers["authorization"];
  if (!token)
  return res.status(401).send({
    success: false,
    message: "Unauthorized access(Invalid access token)."
  });
  jwt.decode(key, token, function (err, decodedPayload, decodedHeader) {
    if (err) {
      console.log(
        "------------ Error while parsing JWT Token ---------------------- "
      );
      console.log(err);
      return res.status(401).send({
        success: false,
        message: "Unauthorized access(Invalid access token)."
      });
    }
    
    req.user = {
      id: decodedPayload._id,
      email_id: decodedPayload.email_id,
      
    };
    User.find({email_id:decodedPayload.email_id})
    .then(user=>{
      if(user){
        return next()
      }else{
        return res.status(401).send({
          success: false,
          message: "Invalid authorization token."
        });
      }
    })

  })
}
//-



// creation of routes

server.get('/home', isAuthorized,(req, res) => {
  console.log(req.user)
  return res.send("klhlk")
});

//-


})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})