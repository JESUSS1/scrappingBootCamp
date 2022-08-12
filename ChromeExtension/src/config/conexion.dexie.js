import Dexie from 'dexie';
//import profileSchema from '../models/profile';

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