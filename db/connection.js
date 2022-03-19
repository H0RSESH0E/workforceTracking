// Imports the mysql2 module
const mysql = require('mysql2');

// Creates a connection pool avoiding wasted overhead from opening and closing the connection each time.
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'workforce',
  password: ''
});

module.exports = db;