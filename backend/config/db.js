// get the client
const mysql = require('mysql2');
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  //password: process.env.DB_PWD,
  password: 'root',
  port: 3306,
  database: 'groupomania',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connecté a mysql avec l'id "  + connection.threadId);
});

module.exports= connection;