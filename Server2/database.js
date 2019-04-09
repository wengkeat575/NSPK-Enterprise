var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cs172",
  database: "employees"
});

module.exports = connection;

