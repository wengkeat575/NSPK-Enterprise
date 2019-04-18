var express = require('express');
var router = express.Router();
const connection  = require ('../database.js');

// jwt.checkJwt,

router.get("/:employeeid",  function(req, res) {
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

module.exports = router;

