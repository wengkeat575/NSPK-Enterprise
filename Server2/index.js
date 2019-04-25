var https = require('https');
var http = require('http');
var fs = require('fs');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// const {checkJwt,checkScopes} = require('./middleware/isLoggedIn')

// Start Auth0 API protect
const express = require('express');
const cors = require('cors');

// Create a service (the app object is just a callback).
const app = express();

// enhance your app security with Helmet
app.use(helmet());

app.use(bodyParser.json());

// Enable all cors request
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));


require('dotenv').config();
if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
	throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}

// Create a service (the app object is just a callback).
var employee = require ('./routes/employee')
var admin = require("./routes/admin");


// // Sample public 
// app.get('/api/public', function(req, res) {
//   res.json({
//     message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
//   });
// });

// app.get('/api/private', checkJwt, function(req, res) {
//   res.json({
//     message: 'Hello from a private endpoint! You need to be authenticated to see this.'
//   });
// });

// app.get('/api/private-scoped', checkJwt, function(req, res) {
//   res.json({
//     message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
//   });
// });

app.use(function(err, req, res, next){
  console.error(err.stack);
  return res.status(err.status).json({ message: err.message });
});

app.use(express.json())  
// Routes

app.use("/employees", employee);
app.use("/admin", admin);

app.get('/', function(req, res) {
	res.json({
	  message: 'Dashboard'
	});
  });
// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

// Create an HTTP service.
// http.createServer(app).listen(3000);
// Create an HTTPS service identical to the HTTP service.

// app.listen(8080);
https.createServer(options,app).listen(8080);

