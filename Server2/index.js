var https = require('https');
var http = require('http');
var fs = require('fs');




// Auth
const {checkJwt, checkScopes} = require('./auth');
var isLoggedIn = require('./middleware/isLoggedIn');
var session = require('express-session');
var authRouter = require('./routes/auth');
// config express-session
var sess = {
  secret: 'nspk',
  cookie: {},
  resave: false,
  saveUninitialized: true
};

// Start Auth0 API protect
const express = require('express');
const cors = require('cors');

// Create a service (the app object is just a callback).
const app = express();
require('dotenv').config();

// Setup passport JS

// Load environment variables from .env
var dotenv = require('dotenv');
dotenv.config();

// Load Passport
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:8080/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
	// profile has all the information from the user
	console.log(profile)
    return done(null, profile);
  }
);

passport.use(strategy);
// You can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
	throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}

const corsOptions =  {
origin: 'http://localhost:8080'
};

app.use(cors(corsOptions));


if (app.get('env') === 'production') {
sess.cookie.secure = true; // serve secure cookies, requires https
}

app.use('/', authRouter);




// Create a service (the app object is just a callback).
var employee = require ('./routes/employee')
var admin = require("./routes/admin");


// Sample public 
app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

app.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  return res.status(err.status).json({ message: err.message });
});

app.use(express.json())  
// Routes

app.use("/employees", employee);
app.use("/admin", admin);
app.get('/', isLoggedIn(), function(req, res) {
	res.json({
	  message: 'Dashboard'
	});
  });
// This line is from the Node.js HTTPS documentation.
// var options = {
//   key: fs.readFileSync('server.key'),
//   cert: fs.readFileSync('server.cert')
// };

// Create an HTTP service.
//http.createServer(app).listen(3000);
// Create an HTTPS service identical to the HTTP service.

app.listen(8080);
//https.createServer(options,app).listen(8080);

