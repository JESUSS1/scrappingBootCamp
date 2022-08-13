var express = require('express');
var {ClsProfile,ClsContactInfo,ClsWebSite,ClsEducationTitles,ClsExperienceTitles}= require('./Clases/profile');
var {org_ExperienciaT,org_EducationT,org_Profile} = require('./utils/organizarDatos')
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

    //console.log(_contactInfo,_educationTitles,_experienceTitles);

    
    var objProfile = new ClsProfile(); 
    objProfile.guardar(org_Profile(req.body.name),function(err,res){
       if(err){
           respuesta.send(err);
       }else{
           let _id_profile = res.insertId;


           objProfile.listarPerfiles((res)=>{
               

               respuesta.send(res);
           })
       }

   })


    objContactInfo.guardar(objContactInfo,async function(err,res){
        if(err){
            res.send(err);
        }else{
            let _id_contactInfo = res.insertId;
            if(_contactInfo.website != null){
                let _website = _contactInfo.website.map(x=>{
                    let objWebSite = new ClsWebSite();
                    objWebSite.id_contactInfo = _id_contactInfo;
                    objWebSite.url = x.url;
                    objWebSite.categoria = x.type.category;
                    objWebSite.guardar(objWebSite,function(err,res){
                        if(err){console.log("error al guardar webSites")}
                    });
                })
            }

            let objExperienciaT = new ClsExperienceTitles();
            objExperienciaT.guardar(org_ExperienciaT(_experienceTitles),function(err,res){
                if(err){console.log("error al guardar Experiencias Trabajo");}
                else{
                     let _id_experienceTitles = res.insertId;
                     let objEducationT = new ClsEducationTitles();
                     objEducationT.guardar(objEducationT,function(err,res){
                        if(err){console.log("error al guardar education");}
                        else{
                             //console.log(res.insertId)
                             let _id_educationTitles = res.insertId;

                        }             
                    })
                }
            });
            
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
