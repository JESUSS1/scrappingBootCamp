export function getCookie(cookieKey,cookieString){
  return cookieString
    .split(';')
    .find(cookie => cookie.includes(cookieKey))
    .replace(cookieKey+'=',"")
    .replaceAll('"','')
    .trim();
  }

  /*
  cookieString
    .split(';')
    .find(cookie => cookie.includes(cookieKey))
    .replace(/JSESSIONID=|"/g,"")
    .trim();
  */