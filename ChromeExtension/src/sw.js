import {db} from './config/conexion.dexie'
import {inyectarScript,inyectarScrapCandidatos,deleteAndCreateTab} from './utils/chromeFunciones'
import FetchService from './servicios/funcionFetch';
console.log("server");
chrome.action.onClicked.addListener((tab)=> {
  console.log("Click");
  inyectarScrapCandidatos(tab.id)
});

chrome.runtime.onConnect.addListener((port)=> {

  const secureChannels = ['secureChannelScrap','secureChannelScrapProfile']

  if(!secureChannels.includes(port.name))
  throw new Error ('No es un canal seguro')

  switch(port.name){
    case secureChannels[0]:
      port.onMessage.addListener(async (msg,{sender:{tab:{id:tabId,url:tabUrl}}})=>{

        const originalUrlParams = new URLSearchParams(tabUrl.match(/\?.+/)[0].replace('?',''));
        const page = originalUrlParams.has('page')?Number(originalUrlParams.get('page'))+1:2

        db.urlsCandidate.add({
          urls:msg.UrlCandidates
        });

        let finalizarNextPage = false;
        
        if(await db.recorridoNextPage.get(1)){
          let datosNextPage =  await db.recorridoNextPage.get(1);
          let urlPages = datosNextPage.urls;

          console.log("Position Page " +(parseInt(datosNextPage.positionPage)+1) );
          msg.UrlCandidates.map(x=>{
            urlPages.push(x);
          });
          await db.recorridoNextPage.update(1, {"positionPage":(parseInt(datosNextPage.positionPage)+1),"urls":urlPages});

          //LE INDICAMOS LA CANTIDAD DE PAGINACION QUE REALIZARA COMO MAXIMO
          let totalPaginacion = 2;
          if((parseInt(datosNextPage.positionPage)+1) < totalPaginacion){
            finalizarNextPage = false;
          }else{

            if(urlPages.length > 0){
               //si ya existe el registro de control de posiciones entonces no se crea  nuevamente, si no que se reuliza actualizando sus datos
              if(await db.recorridoProfiles.get(1)){
                db.recorridoProfiles.update(1, {"positionProfile":'1',"totalProfiles":urlPages.length})
              }else{
                db.recorridoProfiles.add({
                  totalProfiles:urlPages.length, 
                  positionProfile:'1'
                });
              }
              console.log("total de datos "+urlPages.length);
              const newTabId = await deleteAndCreateTab(tabId,urlPages[0]); 
              inyectarScript('scripts/scrapper.js',newTabId);
    
            }

            finalizarNextPage = true;
            console.log("FIN");
          }
        }else{
          db.recorridoNextPage.add({
            urls:msg.UrlCandidates, 
            positionPage:"1"
          });
        }
        
        if(finalizarNextPage){
          console.log("Terminar paginado");
        }else{
          const newTabId = await deleteAndCreateTab(tabId, tabUrl+'&page='+page); 
          console.log("inyectando escrapeo "+newTabId);
          inyectarScrapCandidatos(newTabId)
        }
   
      });
      break;
    case secureChannels[1]: 
      port.onMessage.addListener(async ({profile},{sender:{tab:{id:tabId}}})=>{

        let obtenerInfoRecorrido = await db.recorridoProfiles.get(1);

         //obtenemos la posicion actual e incrementamos en 1 , en referencia a las urls scrapeadas 
        let positionNext = parseInt(obtenerInfoRecorrido.positionProfile) +1;
        db.profiles.add(profile);

        jsonProfile = JSON.stringify(profile);
        FetchService.createUrlProfiles(jsonProfile).catch(async err => {
        });

        //si la positionActual es mayor al total de perfiles registrados entonces ya no scrapearia mas
        if(positionNext <= parseInt(obtenerInfoRecorrido.totalProfiles)){
          console.log("position "+positionNext);
          db.recorridoProfiles.update(1, {"positionProfile":positionNext});  //siempre modificaremos el primer registro, porque agregar mas no es necesario
          let datosNextPage =  await db.recorridoNextPage.get(1);//1 porque todo lo guardamos y actualizamos en nu solo registro

          const urlsRaw = datosNextPage.urls;
          console.log("url siguiente "+urlsRaw[positionNext - 1]);
          //iremmos a la siguiente enlace,en arrays las posiciones comienzan en 0 , => positionNext - 1 ; 
          const newTabId = await deleteAndCreateTab(tabId, urlsRaw[positionNext - 1]); 
          inyectarScript('scripts/scrapper.js',newTabId);
        }else{
          await db.recorridoNextPage.update(1, {"positionPage":"0","urls":[]});
          await db.recorridoProfiles.update(1, {"positionProfile":'1',"totalProfiles":0})
        }
        
    });
      break;
    default:
      break;
  }

});

