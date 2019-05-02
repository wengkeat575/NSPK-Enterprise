var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "employees"

});

module.exports = connection;

