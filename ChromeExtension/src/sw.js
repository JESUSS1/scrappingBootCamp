import {db} from './config/conexion.dexie'
import {inyectarScript,inyectarScrapCandidatos,deleteAndCreateTab} from './utils/chromeFunciones'


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

        //const originalUrlParams = new URLSearchParams(tabUrl.match(/\?.+/)[0].replace('?',''));
        //const page = originalUrlParams.has('page')?Number(originalUrlParams.get('page'))+1:2
        
        //await chrome.tabs.update(tabId,{url:tabUrl+'&page='+page}) 
        
        db.urlsCandidate.add({
          urls:msg.UrlCandidates
        });

        console.log("Total de perfiles Obtenidos " +msg.UrlCandidates.length);
        if(msg.UrlCandidates.length > 0){
           //si ya existe el registro de control de posiciones entonces no se crea  nuevamente, si no que se reuliza actualizando sus datos
          if(await db.recorridoProfiles.get(1)){
            db.recorridoProfiles.update(1, {"positionProfile":'1',"totalProfiles":msg.UrlCandidates.length})
          }else{
            db.recorridoProfiles.add({
              totalProfiles:msg.UrlCandidates.length, 
              positionProfile:'1'
            });
          }

          //const {id} = await chrome.tabs.create({ url:msg.UrlCandidates[0],listaCount:msg.UrlCandidates.length,position:0});
          const {id} = await chrome.tabs.create({ url:msg.UrlCandidates[0]});

          //inyectarScrapCandidatos(tabId)
          
      
          inyectarScript('scripts/scrapper.js',id);


        }
    
      });
      break;
    case secureChannels[1]: 
      port.onMessage.addListener(async ({profile},{sender:{tab:{id:tabId}}})=>{

        let obtenerInfoRecorrido = await db.recorridoProfiles.get(1);

         //obtenemos la posicion actual e incrementamos en 1 , en referencia a las urls scrapeadas 
        let positionNext = parseInt(obtenerInfoRecorrido.positionProfile) +1;
        db.profiles.add(profile);

        //si la positionActual es mayor al total de perfiles registrados entonces ya no scrapearia mas
        
        if(positionNext <= parseInt(obtenerInfoRecorrido.totalProfiles)){
          db.recorridoProfiles.update(1, {"positionProfile":positionNext});  //siempre modificaremos el primer registro, porque agregar mas no es necesario
          const [urlsRaw]= await db.urlsCandidate.toArray();
          //iremmos a la siguiente enlace,en arrays las posiciones comienzan en 0 , => positionNext - 1 ; 
          const newTabId = await deleteAndCreateTab(tabId, urlsRaw.urls[positionNext - 1]); 
          inyectarScript('scripts/scrapper.js',newTabId);
        }
        
        //const {id} = await chrome.tabs.update(tabId,{url:urlsRaw.urls[1]}) 
        //const {id} = await chrome.tabs.create({ url:urlsRaw.urls[1]});
        //const newTabId = await deleteAndCreateTab(tabId, urlsRaw.urls[1]);

        //inyectarScript('scripts/scrapper.js',newTabId);
    });
      break;
    default:
      break;
  }

});

