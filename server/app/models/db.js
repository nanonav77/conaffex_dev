
const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Creamos la conexión a la base de datos
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// Se abre la conexión para ejecutar las consultas
connection.connect(error => {
  if (error) throw error;
  console.log("Base de datos conectada satisfactoriamente.");
});

module.exports = connection;