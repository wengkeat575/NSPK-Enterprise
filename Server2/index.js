var https = require('https');
var http = require('http');
var fs = require('fs');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connection = require('./database.js');
const express = require('express');
const cors = require('cors');

const app = express();

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

var employee = require ('./routes/employee')
var admin = require("./routes/admin");

app.use(function(err, req, res, next){
	next();
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

// Create an HTTPS service identical to the HTTP service.

app.get("/getallemployees", function(req, res) {
console.log("getall");
	console.log(req.query);
  const query = `SELECT * FROM employees INNER JOIN dept_emp ON employees.emp_no = dept_emp.emp_no INNER JOIN departments ON dept_emp.dept_no = departments.dept_no INNER JOIN titles ON employees.emp_no = titles.emp_no ORDER BY employees.last_name, employees.first_name LIMIT ${req.query.page * 200 - 199},200; `;
  connection.query(query, function(error, results, fields) {
    //if error, print blank results
    if (error) {
 
      res.send(JSON.stringify({ "status": 400, "error": true }));
    }else{
    //res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    res.send(JSON.stringify(results));
    }
  });
});



var options = {
	key: fs.readFileSync('server.key'),
	cert: fs.readFileSync('server.cert')
  };
  
app.listen(4000);
https.createServer(options,app).listen(4100);

