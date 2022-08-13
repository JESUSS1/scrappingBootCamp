var {ClsProfile,ClsContactInfo,ClsWebSite,ClsEducationTitles,ClsExperienceTitles} = require('../Clases/profile')


function org_ExperienciaT(_experienceTitles,id_profile){
    let objExperienciaT = new ClsExperienceTitles();
    _experienceTitles.map(x=>{

    })

    objExperienciaT.id_profile = id_profile;
    objExperienciaT.nombre = _experienceTitles.title;
    objExperienciaT.enterprise = _experienceTitles.enterprise;
    objExperienciaT.fecha_inicio = _experienceTitles.startDate??null;
    objExperienciaT.fecha_fin = _experienceTitles.endDate??null;
    console.log(_experienceTitles);
    return objExperienciaT;
}

function org_EducationT(_educationTitles,id_profile){
    let objEducationT = new ClsEducationTitles();
    objEducationT.id_profile = id_profile;
    objEducationT.nombre = _educationTitles.title;
    objEducationT.enterprise = _educationTitles.enterprise;
    objEducationT.fecha_inicio = _educationTitles.startDate??null;
    objEducationT.fecha_fin = _educationTitles.endDate??null;
    return objEducationT;
}
function org_Profile(name){
    var objProfile = new ClsProfile(); 
    objProfile.nombre = name
    return objProfile;
}

function org_ContactInfo(_contactInfo,id_profile){
    var objContactInfo = new ClsContactInfo();
    objContactInfo.id_profile = id_profile;
    objContactInfo.email = _contactInfo.phoneNumbers??null;
    objContactInfo.telefono = _contactInfo.emailAddress??null;
    objContactInfo.twitter =(_contactInfo.twitterHandles.lenght>0)?_contactInfo.twitterHandles[0]:null;
    return objProfile;
}


module.exports = {org_ExperienciaT,org_EducationT,org_Profile,org_ContactInfo};