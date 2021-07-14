require("dotenv").config();
const mysql = require("mysql2");

// Création de la conection à la base de donnée.
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  port: 3306,
  database: process.env.DB_DATABASE,
  socketPath: process.env.DB_PATH,
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connecté a mysql avec l'id " + connection.threadId);
});

module.exports = connection;
