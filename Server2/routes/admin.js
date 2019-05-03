var express = require('express');
var router = express.Router();
var middleware = require("../middleware");
const connection = require("../database.js");
// const {checkJwt , checkScopes} = require('../middleware/isLoggedIn')


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

  // Check scropes
// const checkScopes = jwtAuthz(['read:messages']);
  // console.log(req.user)
  // if (req.user) { return next(); }
  // req.session.returnTo = req.originalUrl;
  // res.redirect('/login');



router.get("/getallemployees/:from", middleware.isAdmin, function(req, res) {

  const query = `SELECT * FROM employees Limit ${req.params.from}, 100; `;
  connection.query(query, function(error, results, fields) {
    //if error, print blank results
    if (error) {

      res.send(JSON.stringify({ "status": 400, "error": true }));
    }else{

    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    }
  });
});


router.get("/get1employees/:employeeid", checkJwt, middleware.isAdmin, function(req, res) {
// router.get("/get1employees/:employeeid", function(req, res) {

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

  connection.query(query, function (error, results, fields) {

    if (error) {

      res.send(JSON.stringify({ "status": 400, "error": true}));
    } else {

    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    }
  });

});

//checkJwt,
router.get("/search/:name", function (req, res) {

  const query = `SELECT * FROM employees WHERE CONCAT(first_name, ' ', last_name) LIKE '%${req.params.name}%' limit 50;`

  connection.query(query, function (error, results, fields) {
    //if error, print blank results
    if (error) {
      res.send(JSON.stringify({ "status": 400, "error": true }));
    } else {

      res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    }
  });
});

function format(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();
  return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

// checkJwt, middleware.isAdmin,
router.post("/updateinfo", function (req, res) {
// router.post("/updateinfo", function (req, res) {
  var today = new Date();
  today = format(today);

  if (req.body.salary === 1){
    query01 = `UPDATE salaries
            SET to_date='${today}'
            WHERE emp_no = '${req.body.info.emp_no}' and to_date= '9999-01-01';`
    query02 = `INSERT INTO salaries
            VALUES ('${req.body.info.emp_no}','${req.body.info.salary}','${today}','9999-01-01');`

    connection.beginTransaction(function (err) {
      if (err) { res.send(JSON.stringify({ "affectedRows": 5, "error": true })); }
      connection.query(query01, function (err, result) {
        if (err) {
          connection.rollback(function () {
            res.send(JSON.stringify({ "affectedRows": 6, "error": true }));
          });
        }
        connection.query(query02, function (err, result) {
          if (err) {
            connection.rollback(function () {
              res.send(JSON.stringify({ "affectedRows": 7, "error": true }));
            });
          }
          connection.commit(function (err) {
            if (err) {
              connection.rollback(function () {
                res.send(JSON.stringify({ "affectedRows": 8, "error": true }));
              });
            }

          });
        });
      });
    });
  }

  if (req.body.title === 1) {

    query1 = `UPDATE titles
            SET to_date='${today}'
            WHERE emp_no = '${req.body.info.emp_no}' and to_date= '9999-01-01';`
    query2 = `INSERT INTO titles
            VALUES ('${req.body.info.emp_no}','${req.body.info.title}','${today}','9999-01-01');`

    connection.beginTransaction(function (err) {
      if (err) { res.send(JSON.stringify({ "affectedRows": 1, "error": true })); }
      connection.query(query1, function (err, result) {
        if (err) {
          connection.rollback(function () {
            res.send(JSON.stringify({ "affectedRows": 2, "error": true }));
          });
        }
        connection.query(query2, function (err, result) {
          if (err) {
            connection.rollback(function () {
              res.send(JSON.stringify({ "affectedRows": 3, "error": true }));
            });
          }
          connection.commit(function (err) {
            if (err) {
              connection.rollback(function () {
                res.send(JSON.stringify({ "affectedRows": 0, "error": true }));
              });
            }


          });
        });
      });
    });
  }

  if (req.body.employee === 1) {
    const query = `UPDATE employees
                  SET birth_date='${req.body.info.birth_date}', first_name='${req.body.info.first_name}', last_name= '${req.body.info.last_name}', gender ='${req.body.info.gender}', hire_date = '${req.body.info.hire_date}'
                  WHERE emp_no= ${req.body.info.emp_no};`
    connection.query(query, function (error, results, fields) {

      if (error) {
        res.send(JSON.stringify({ "affectedRows": 0, "error": true }));
      }

    });

  }

  res.send(JSON.stringify({ "error": null }));

});


module.exports = router;
