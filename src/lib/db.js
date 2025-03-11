import Dexie from 'dexie';

const db = new Dexie('Agenda');
db.version(1).stores({
    users: '++id, username, *email, password',
    events: '++id, eventName, description, eventDate, hour_start, hour_end, color, *userID',
});

export default db;