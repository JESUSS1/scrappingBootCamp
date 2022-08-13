class FetchService {
    urlApi = 'http://localhost:3000/api/profile';
  
    async createUrlProfiles(profile) {
      return fetch(this.urlApi ,{
        method : 'POST',
        body   : profile,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      } );
    }
  }
  
  export default new FetchService();

  