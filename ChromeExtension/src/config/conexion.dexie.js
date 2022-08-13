import Dexie from 'dexie';

export const db = new Dexie('myDatabase');

db.version(1).stores({
  urlsCandidate: '++id, urls',
});

db.version(1).stores({
  //profiles: '++id, '+Object.keys(profileSchema.params).join(', ') // crear esquemas en vez de puro texto
  profiles: '++id, name, contactInfo, experienceTitles, educationTitles'
});

db.version(1).stores({
  //profiles: '++id, '+Object.keys(profileSchema.params).join(', ') // crear esquemas en vez de puro texto
  recorridoProfiles: '++id, totalProfiles, positionProfile'
});

db.version(1).stores({
  recorridoNextPage: '++id, urls, positionPage'
});