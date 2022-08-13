var express = require('express');
var {ClsProfile,ClsContactInfo,ClsWebSite,ClsEducationTitles,ClsExperienceTitles}= require('./Clases/profile');
var {org_ExperienciaT,org_EducationT,org_Profile,org_ContactInfo} = require('./utils/organizarDatos')
const server = express();
var cors = require('cors')

//configuracion
server.use(express.json());
server.use(cors())

//rutas


server.post('/api/profile',(req,respuesta)=>{

    var _contactInfo = req.body.contactInfo.data;
    var _educationTitles = req.body.educationTitles;
    var _experienceTitles = req.body.experienceTitles;
    
    var objProfile = new ClsProfile(); 
    objProfile.guardar(org_Profile(req.body.name),function(err,res){
       if(err){
           respuesta.send(err);
       }else{
           let _id_profile = res.insertId;
           org_ContactInfo(_contactInfo,_id_profile);
           org_EducationT(_educationTitles,_id_profile);
           org_ExperienciaT(_experienceTitles,_id_profile);

           objProfile.listarPerfiles((res)=>{
               respuesta.send(res);
           })
       }

   })

});

server.get('/',(req,res,next)=>{
    res.send("Servidor Scrapper");
})

server.get('/api/profile',(req,res)=>{
    var objProfile = new ClsProfile(); 
    objProfile.listarPerfiles((resultados)=>{
        res.send(resultados);
    })
})

//start server

server.listen(3000,()=>{
    console.log('server activo en puerto 3000');
});
