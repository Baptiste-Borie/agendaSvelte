// src/db.js
import Dexie from 'dexie';

// Initialisation de la base de données
const db = new Dexie('Agenda');
db.version(1).stores({
    users: '++id, username, password' // Définit la table `users`
});

// Ajouter un utilisateur de test (à exécuter une seule fois)
async function addTestUser() {
    const existingUser = await db.users.where('username').equals('test').first();
    if (!existingUser) {
        await db.users.add({ username: 'test', password: 'test123' });
        console.log('Utilisateur test ajouté');
    } else {
        console.log('Utilisateur test existe déjà');
    }
}

// Appeler la fonction pour ajouter l'utilisateur de test
// addTestUser();

export default db;