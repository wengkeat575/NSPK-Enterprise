var express = require('express');
var router = express.Router();
var middleware = require("../middleware");
const connection  = require ('../database.js');

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

// Auth0 functions 
const checkJwt = jwt({
	// Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
	secret: jwksRsa.expressJwtSecret({
	  cache: true,
	  rateLimit: true,
	  jwksRequestsPerMinute: 5,
	  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
	}),
  
	// Validate the audience and the issuer.
	audience: process.env.AUTH0_AUDIENCE,
	issuer: `https://${process.env.AUTH0_DOMAIN}/`,
	algorithms: ['RS256']
  });
  
// router.get("/:employeeid", checkJwt, middleware.isThisYourAccount, function(req, res) {
router.get("/:employeeid", middleware.isThisYourAccount, function(req, res) {
  console.log("connect ");

  const query = `SELECT employees.emp_no, employees.birth_date , employees.first_name,
                employees.last_name, employees.gender, employees.hire_date, title.title, salary.salary 
                FROM ((employees
                INNER JOIN (
                  SELECT emp_no, title
                  FROM titles
                  WHERE emp_no = ${req.params.employeeid}
                  ORDER BY from_date DESC
                  Limit 1
                )title ON employees.emp_no = title.emp_no)
                INNER JOIN (
                  SELECT emp_no, salary
                  FROM salaries
                  WHERE emp_no = ${req.params.employeeid}
                  ORDER BY from_date DESC
                  Limit 1
                )salary ON employees.emp_no = salary.emp_no);`;

  connection.query(query, function(error, results, fields) {
    //if error, print blank results
    if (error) {

      res.send(JSON.stringify({ "status": 400, "error": true }));
    } else{

    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    }
  });
});

router.get("/getLoginEmployee/:email", function(req, res) {
	console.log("connect ");
  
	const query = `SELECT emp_no, email 
					FROM email
					WHERE email = '${req.params.email}'
					Limit 1`;
	connection.query(query, function(error, results, fields) {
	  if (error) {
		res.send(JSON.stringify({ "status": 400, "error": true , "msg": error, "connected": null}));
	  } else{
		console.log('results',results)
		if (results.length > 0){
			const query2 = `SELECT employees.emp_no, employees.birth_date , employees.first_name,
			employees.last_name, employees.gender, employees.hire_date, title.title, salary.salary 
			FROM ((employees
			INNER JOIN (
			  SELECT emp_no, title
			  FROM titles
			  WHERE emp_no = ${results[0].emp_no}
			  ORDER BY from_date DESC
			  Limit 1
			)title ON employees.emp_no = title.emp_no)
			INNER JOIN (
			  SELECT emp_no, salary
			  FROM salaries
			  WHERE emp_no = ${results[0].emp_no}
			  ORDER BY from_date DESC
			  Limit 1
			)salary ON employees.emp_no = salary.emp_no);`;
			connection.query(query2, function(error, results, fields) {
			if (error) {
				res.send(JSON.stringify({ "status": 400, "error": true , "msg": error, "connected": null}));
			} else{
				res.send(JSON.stringify({ "status": 200, "error": null, "response": results, "connected": true }));
			}
			});
		} else {
			res.send(JSON.stringify({ "status": 400, "error": null , "msg": "nodatafound",  "connected": false }));
		}
	  }
	});
  });

router.post("/insert", function (req, res) {

  const query = `UPDATE email
            SET email = ('${req.body.info.email}')
            WHERE emp_no = '${req.body.info.emp_no}' AND secKey = '${req.body.info.secKey}'`

  connection.query(query, function (error, results) {
    //if error, print blank results
    if (error) {
	//   res.send(JSON.stringify({ "status": 400, "error": true }));
	  res.send(JSON.stringify({ "status": 400, "error": true , "msg": error, "success": null}));
    } else {
      let success = false
      if (results.affectedRows != 0){
        success = true
      }
      res.send(JSON.stringify({ "status": 200, "error": null, "success": success }));
    }
  });

});



module.exports = router;

