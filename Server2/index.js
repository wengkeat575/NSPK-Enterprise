var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
// Create a service (the app object is just a callback).
var app = express();
const mysql = require('mysql');

// Auth0 API protect
// https://auth0.com/blog/react-tutorial-building-and-securing-your-first-app/
// Auth0 bobgel12@gmail.com
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
	  cache: true,
	  rateLimit: true,
	  jwksRequestsPerMinute: 5,
	  jwksUri: `https://<YOUR_AUTH0_DOMAIN>/.well-known/jwks.json`
	}),
  
	// Validate the audience and the issuer.
	audience: '<YOUR_AUTH0_CLIENT_ID>',
	issuer: `https://<YOUR_AUTH0_DOMAIN>/`,
	algorithms: ['RS256']
  });

// Use checkJwt as a middleware 

// Dung Code
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Might remove later since we use react for the Client
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// Routes

app.get("/employees/:employeeid", checkJwt, usersRouter);
app.get("/admin/getallemployees/:from", checkJwt, indexRouter);
app.get("/admin/get1employees/:employeeid", checkJwt, indexRouter);
app.post("/admin/updateinfo/", checkJwt, indexRouter);


// End Dung Code

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

// Create an HTTP service.
//http.createServer(app).listen(3000);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(3000);
