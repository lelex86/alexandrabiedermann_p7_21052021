// get the client
const mysql = require('mysql2');
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: process.env.DB_PWD,
  database: 'groupomania'
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connecté a mysql avec l'id "  + connection.threadId);
});

module.exports= connection;