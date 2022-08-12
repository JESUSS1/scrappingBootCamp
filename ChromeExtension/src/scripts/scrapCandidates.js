import {searchSelectors} from '../config/scrapperSelectors'
import {waitForSelector,waitForScroll} from '../utils/waitFor';
import { $$, $ } from '../utils/selectors';

async function init(){

  await waitForSelector(searchSelectors.paginateResultsContainer);
  await waitForScroll();
  //const UrlCandidates = $$(searchSelectors.paginateResultsContainer).map(element=> $('.app-aware-link',element).href);
  
  //cadena actualizada para optener los enlaces de los perfiles que con sean por defecto 'Miembro de Linkedin'
  const UrlCandidates = $$(searchSelectors.paginateResultsContainer)
  .map(element=> $('.app-aware-link',element).href)
  .filter(x=>x.match('miniProfileUrn'));
  
  console.log(UrlCandidates);
  const port = chrome.runtime.connect({name:"secureChannelScrap"});

  port.postMessage({ UrlCandidates });
    
}

init();