var express = require('express');
var router = express.Router();
var jwt = require("../index.js");
const database  = require ('../database.js');




// jwt.checkJwt,

router.get("/:employeeid",  function(req, res) {
  database.connection.connect();
  let query = `SELECT employees.emp_no, employees.birth_date , employees.first_name,
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

  database.connection.query(query, function(error, results, fields) {
    //if error, print blank results
    if (error) {
      // console.log(error);
      var apiResult = {};

      apiResult.meta = {
        table: section,
        type: "collection",
        total: 0
      };
      //create an empty data table
      apiResult.data = [];

      //send the results (apiResult) as JSON to Express (res)
      //Express uses res.json() to send JSON to client
      //you will see res.send() used for HTML
      res.json(apiResult);
    }

    //make results
    var resultJson = JSON.stringify(results);
    resultJson = JSON.parse(resultJson);
    var apiResult = {};

    // create a meta table to help apps
    //do we have results? what section? etc
    apiResult.meta = {
      table: section,
      type: "collection",
      total: 1,
      total_entries: 0
    };

    //add our JSON results to the data table
    apiResult.data = resultJson;

    //send JSON to Express
    res.json(apiResult);
  });

  database.connection.end();

});

module.exports = router;

