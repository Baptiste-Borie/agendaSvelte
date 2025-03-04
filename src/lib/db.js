import Dexie from 'dexie';

const db = new Dexie('Agenda');
db.version(1).stores({
    users: '++id, username, email, password'
});

export default db;