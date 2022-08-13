var db = require('./conexion.db');

function guardar(objShort,callback){    
    db.query("INSERT INTO links (enlaceOriginal,enlaceShort) VALUES(?,?) ",
    [objShort.enlaceOriginal,objShort.enlaceShort],function(err,resultados){
        if(!err) {
            console.log("subido "+resultados)
            callback(err);
        }else{
            callback(err);
        }
      });
}

module.exports = {guardar}

nombre,id_contactInfo,id_educationTitles,id_experienceTitles