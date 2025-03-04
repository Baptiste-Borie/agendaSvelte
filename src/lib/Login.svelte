<!-- src/routes/Login.svelte -->
<script>
    import db from './db.js'; // Importez la base de données
    import { onMount } from 'svelte';

    // Variables réactives
    let username = '';
    let password = '';
    let error = '';
    let loggedInUser = null;

    // Fonction pour gérer la connexion
    async function login() {
        try {
            // Recherchez l'utilisateur dans la table `users`
            const user = await db.users.where('username').equals(username).first();
            if (user && user.password === password) {
                loggedInUser = user; // Connexion réussie
                error = '';
                console.log('Connexion réussie:', loggedInUser);
            } else {
                error = 'Nom d\'utilisateur ou mot de passe incorrect';
            }
        } catch (err) {
            error = 'Erreur lors de la connexion';
            console.error('Erreur:', err);
        }
    }

    // Fonction pour déconnecter l'utilisateur
    function logout() {
        loggedInUser = null;
        username = '';
        password = '';
        error = '';
    }

    // Optionnel : Afficher tous les utilisateurs au chargement du composant
    onMount(async () => {
        const allUsers = await db.users.toArray();
        console.log('Utilisateurs dans la base de données:', allUsers);
    });
</script>

<main>
    <h1>Connexion</h1>
    {#if loggedInUser}
        <p>Bienvenue, {loggedInUser.username}!</p>
        <button on:click={logout}>Se déconnecter</button>
    {:else}
        <form on:submit|preventDefault={login}>
            <div>
                <label for="username">Nom d'utilisateur:</label>
                <input type="text" id="username" bind:value={username} required />
            </div>
            <div>
                <label for="password">Mot de passe:</label>
                <input type="password" id="password" bind:value={password} required />
            </div>
            {#if error}
                <p style="color: red;">{error}</p>
            {/if}
            <button type="submit">Se connecter</button>
        </form>
    {/if}
</main>

<style>
    main {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        font-family: Arial, sans-serif;
    }
    label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
    }
    input {
        width: 100%;
        padding: 8px;
        margin-bottom: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    button {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    button:hover {
        background-color: #0056b3;
    }
    p {
        margin: 16px 0;
    }
</style>