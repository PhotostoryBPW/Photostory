var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "photostory"
});

connection.connect(function(err) {
  if (err) {
    throw err;
  }
  console.log("Connected!");
});

module.exports.connection = connection;





