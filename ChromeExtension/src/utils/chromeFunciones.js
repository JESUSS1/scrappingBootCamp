export async function inyectarScript(path,tabId){
  const options = {
    target:{tabId},
    files:[path]
  }
  chrome.scripting.executeScript(options);
}
  
export async function inyectarScrapCandidatos(tabId){
  return inyectarScript("scripts/scrapCandidates.js",tabId);
}

export async function deleteAndCreateTab(oldId, url) {
  try {
    // eslint-disable-next-line no-undef
    chrome.tabs.remove(oldId);
    // eslint-disable-next-line no-undef
    const { id } = await chrome.tabs.create({ url });
    return id;

  } catch (error) {
    // eslint-disable-next-line no-console
   // console.log('🚀 ~ chrome.js ~ line 24 ~ deleteAndCreateTab ~ error', error);
    throw error;
  }

}