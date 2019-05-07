// Middleware
const connection = require('../database.js');
var middleware = [];

middleware.isThisYourAccount = function (req, res, next){
	const query = `SELECT emp_no, email FROM connects WHERE emp_no = ${req.query.employeeid}`
	connection.query(query, function (error, results, fields) {
		if (error) {
			// res.send(JSON.stringify({ "status": 400, "error": true }));
		} else {
			if (results.length > 0){
				if (results[0].email.toUpperCase() == req.query.email.toUpperCase()){
					next();
				}
			}
			// res.send(JSON.stringify({ "status": 400, "error": true }));
		}
	})
}
middleware.isAdmin = function(req, res, next){
	const query = `SELECT emp_no, title FROM titles WHERE emp_no = ${req.query.employeeid}`
	connection.query(query, function (error, results, fields) {
		if (error) {
			// res.send(JSON.stringify({ "status": 400, "error": true }));
		} else {
			if (results.length > 0){
				if (results[0].title == "Technique Leader"){
					next();
				}
			}
			// res.send(JSON.stringify({ "status": 400, "error": true }));
		}
	})
}

module.exports = middleware;