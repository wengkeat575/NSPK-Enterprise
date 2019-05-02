// Middleware
const connection = require('../database.js');
var middleware = [];

middleware.isThisYourAccount = function (req, res, next){
	const query = `SELECT emp_no, email FROM connects WHERE emp_no = ${req.params.employeeid}`
	connection.query(query, function (error, results, fields) {
		if (error) {
			res.redirect("back");
		} else {
			if (results.length > 0){
				if (results[0].email.toUpperCase() == req.params.email.toUpperCase()){
					next();
				}
			}
			res.redirect("back");
		}
	})
}
middleware.isAdmin = function(req, res, next){
	const query = `SELECT emp_no, title FROM titles WHERE emp_no = ${req.params.employeeid}`
	connection.query(query, function (error, results, fields) {
		if (error) {
			res.redirect("back");
		} else {
			if (results.length > 0){
				if (results[0].title.toUpperCase() == "MANAGER"){
					next();
				}
			}
			res.redirect("back");
		}
	})
}

module.exports = middleware;