var {ClsProfile,ClsContactInfo,ClsWebSite,ClsEducationTitles,ClsExperienceTitles} = require('../Clases/profile')


function org_ExperienciaT(_experienceTitles,id_profile){
    _experienceTitles.map(x=>{
        if(x!=null){
        
            let objExperienciaT = new ClsExperienceTitles();
            objExperienciaT.id_profile = id_profile;
            objExperienciaT.nombre = x.title;
            objExperienciaT.enterprise = x.enterprise;
            objExperienciaT.fecha_inicio = x.startDate??null;
            objExperienciaT.fecha_fin = x.endDate??null;
 
            objExperienciaT.guardar(objExperienciaT,function(err,res){
                if(err){console.log("error al guardar Experiencias Trabajo");}
                else{
                }
            });
            

        }
    })
  
}

function org_EducationT(_educationTitles,id_profile){
    
    _educationTitles.map(x=>{
        if(x!=null){
            let objEducationT = new ClsEducationTitles();
            objEducationT.id_profile = id_profile;
            objEducationT.nombre = x.title;
            objEducationT.enterprise = x.enterprise;
            objEducationT.fecha_inicio = x.startDate??null;
            objEducationT.fecha_fin = x.endDate??null;
            objEducationT.guardar(objEducationT,function(err,res){
                if(err){console.log("error al guardar education");}
                else{
                    
                }
            });

        }
    })
}

function org_Profile(name){
    var objProfile = new ClsProfile(); 
    objProfile.nombre = name
    return objProfile;
}

function org_ContactInfo(_contactInfo,id_profile){
    var objContactInfo = new ClsContactInfo();
    objContactInfo.id_profile = id_profile;
    objContactInfo.email = _contactInfo.emailAddress??null;
    objContactInfo.telefono = _contactInfo.phoneNumbers??null;
    objContactInfo.twitter =(_contactInfo.twitterHandles!=null && _contactInfo.twitterHandles.length > 0 )?_contactInfo.twitterHandles[0].name:null;
    //console.log(objContactInfo.twitter);
    objContactInfo.guardar(objContactInfo,async function(err,res){
        if(err){
            console.log("error al guardar ContactInfo");
        }else{
            let _id_contactInfo = res.insertId;
            if(_contactInfo.websites != null){
 
                _contactInfo.websites.map(x=>{
                    let objWebSite = new ClsWebSite();
                    objWebSite.id_contactInfo = _id_contactInfo;
                    objWebSite.url = x.url;
                    objWebSite.categoria = x.type.category;
                    objWebSite.guardar(objWebSite,function(err,res){
                        if(err){console.log("error al guardar webSites")}
                    });
                })
            }
       
        }

    })


}


module.exports = {org_ExperienciaT,org_EducationT,org_Profile,org_ContactInfo};