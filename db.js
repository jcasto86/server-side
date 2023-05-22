const mysql = require("mysql");

// Set up a connection to the MySQL database
const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "proyecto_daw_database",
});

module.exports = dbConnection;
