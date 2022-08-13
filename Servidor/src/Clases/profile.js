var db = require('../conexion/conexion.db');

class ClsProfile {
    constructor(id_profile,nombre,id_contactInfo,id_educationTitles,id_experienceTitles){
        this.id_profile = id_profile;
        this.nombre = nombre;
    }
    listarPerfiles(callback){
        db.query("SELECT * FROM perfiles",function(err,res){
            //resultados.insertId
            callback(res);
        });
    }
   
    guardar(objProfile,callback){    
        db.query("INSERT INTO perfiles (nombre) VALUES(?) ",
        [objProfile.nombre],function(err,res){
            if(!err) {
                console.log("perfiles subido "+res)
                callback(err,res);
            }else{
                callback(err,res);
            }
        });
        
    }
}

class ClsContactInfo{
    constructor(id_contactInfo,id_profile,email,telefono,twitter){
        this.id_contactInfo = id_contactInfo;
        this.id_profile = id_profile;
        this.email = email;
        this.telefono = telefono;
        this.twitter = twitter;
    }
    guardar(objeto,callback){    
        db.query("INSERT INTO contactInfo (id_profile,email,telefono,twitter) VALUES(?,?,?)",
        [objeto.email,objeto.telefono,objeto.twitter],function(err,res){
            if(!err) {
                console.log("contactInfo subido "+res)
                callback(err,res);
            }else{
                callback(err,res);
            }
          });
        
    }
}

class ClsWebSite{
    constructor(id_webSite,id_contactInfo,categoria,url){
        this.id_webSite = id_webSite;
        this.id_contactInfo = id_contactInfo;
        this.categoria = categoria;
        this.url = url;
    }
    guardar(objeto,callback){    
        db.query("INSERT INTO webSite (id_contactInfo,categoria,url) VALUES(?,?,?)",
        [objeto.id_contactInfo,objeto.categoria,objeto.url],function(err,res){
            if(!err) {
                console.log("webSite subido "+res)
                callback(err,res);
            }else{
                callback(err,res);
            }
          });
        
    }
}


class ClsEducationTitles{
    constructor(id_educationTitles,id_profile,nombre,enterprise,fecha_inicio,fecha_fin){
        this.id_educationTitles = id_educationTitles;
        this.id_profile = id_profile;
        this.nombre = nombre;
        this.enterprise = enterprise;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
    }
    guardar(objeto,callback){    
        db.query("INSERT INTO educationTitles (id_profile,nombre,enterprise,fecha_inicio,fecha_fin) VALUES(?,?,?,?,?)",
        [objeto.id_profile,objeto.nombre,objeto.enterprise,objeto.fecha_inicio,objeto.fecha_fin],function(err,res){
            if(!err) {
                console.log("educationTitles subido "+res)
                callback(err,res);
            }else{
                callback(err,res);
            }
          });
        
    }
}


class ClsExperienceTitles{
    constructor(id_experienceTitles,id_profile,nombre,enterprise,fecha_inicio,fecha_fin){
        this.id_experienceTitles = id_experienceTitles;
        this.id_profile = id_profile;
        this.nombre = nombre;
        this.enterprise = enterprise;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
    }
    guardar(objeto,callback){    
        console.log("profile "+objeto.id_experienceTitles);
        db.query("INSERT INTO experienceTitles (id_profile,nombre,enterprise,fecha_inicio,fecha_fin) VALUES(?,?,?,?,?)",
        [objeto.id_profile,objeto.nombre,objeto.enterprise,objeto.fecha_inicio,objeto.fecha_fin],function(err,res){
            if(!err) {
                console.log("experienceTitles subido "+res)
                callback(err,res);
            }else{
                callback(err,res);
            }
          });
        
    }
}




module.exports = {ClsProfile,ClsContactInfo,ClsWebSite,ClsEducationTitles,ClsExperienceTitles};