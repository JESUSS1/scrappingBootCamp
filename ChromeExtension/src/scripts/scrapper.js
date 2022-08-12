import axios from 'axios';
import {$,$$} from '../utils/selectors';
import {profileSelectors} from '../config/scrapperSelectors';
import {getCookie} from '../utils/cookie';
import {waitForScroll, waitForSelector } from '../utils/waitFor';

console.log("Estoy en scrapper 0")
async function getContacInfo(){
  try{
    const token = getCookie('JSESSIONID',document.cookie);
    const [contactInfoName] = $(profileSelectors.contactInfo).href.match(/in\/.+\/o/g) ?? [];
    const contactInfoURL = `https://www.linkedin.com/voyager/api/identity/profiles${contactInfoName.slice(2,-2)}/profileContactInfo`
  
    const {data} = await axios.get(contactInfoURL,{
      headers:{
          accept:'application/vnd.linkedin.normalized+json+2.1',
          'csrf-token':token
      }
    })
    return data;
  }catch(err){
    console.log('hubo un problema, intentelo mas tarde',err);
  }
}
function getExpecificInfo(selector){
  const Elements = $$(selector);

  return Elements.map((listItem)=>{
    if(!$('.pvs-entity__path-node',listItem)){
      //se asigna a dateStringInfo="" , porque aveces no se le asignan fechas y esto puede ocacionar errores al momento de parsearlo
      const [title,enterprise,dateStringInfo=""] = $$('span[aria-hidden]',listItem).map(element => (element.textContent));
      //const [parsedRawDate] = dateStringInfo.match(/.+·?|\d{4} - \d{4}/) ?? [];
      const [parsedRawDate] = dateStringInfo.match(/(\d{4} - .+·?)|(^(\D{3}). ^(\d{4}))/) ?? []; //Se agrego dentro de la exprecion regular '?' para indicar que es opcional que la cadena tenga '·' y no devuelva null
     // const [startDate,endDate] = (parsedRawDate?.replace(/\s|·/g,'').split('-') ?? [])
      const [startDate,endDate] = (parsedRawDate?.replace(/ /g,'').split(/·/)[0].replaceAll(".",' ').split(/-/) ?? [])

      return { title, enterprise, startDate, endDate };
    }

  })
}

async function scrap(){

  await waitForSelector('h1');
  await waitForScroll();
  console.log("Estoy en scrapper 1")

  const name = $(profileSelectors.name).textContent;
  const experienceTitles = getExpecificInfo(profileSelectors.experiencesElements)
  const educationTitles = getExpecificInfo(profileSelectors.educationElements)
  const contactInfo = await getContacInfo();
  
  const profile = {
      name,
      contactInfo,
      experienceTitles,
      educationTitles
  }

  const port = chrome.runtime.connect({name:"secureChannelScrapProfile"});
  port.postMessage({ profile });


  console.log(profile);
}

scrap()
