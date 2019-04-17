var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "quocdung",
  database: "employees"

});

module.exports = connection;

