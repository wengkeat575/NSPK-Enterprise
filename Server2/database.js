var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ankaneta",
  database: "employees"

});

module.exports = connection;

