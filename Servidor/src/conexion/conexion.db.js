var mySql = require('mysql2');

/**
 * Creacion de la Cadena de conexion a la base de datos mySql
 */
var connection = mySql.createConnection({
    host:'localhost',
    user:'root',
    password:'homepass',
    database:'scraperData'
  });

  connection.connect( (err) => {
    if(!err) console.log("Conexion establecida")
    else{console.log("Conexion Fallida"+err.message)}//si existe un error ejecuta lo muestra en consola
  });


  module.exports = connection;

  //connection.end()