<script>
  import { onMount } from "svelte";
  import db from "./db.js";
  import bcrypt from "bcryptjs";

  export let loggedInUser;

  let username = "";
  let email = "";
  let password = "";
  let error = "";

  // Charger les informations de l'utilisateur au montage du composant
  onMount(() => {
    if (loggedInUser) {
      console.log(loggedInUser.id);
      username = loggedInUser.username;
      email = loggedInUser.email;
    }
  });

  // Fonction pour mettre à jour les informations de l'utilisateur
  async function updateUser() {
    if (!username || !email) {
      error = "Veuillez remplir tous les champs obligatoires.";
      return;
    }

    try {
      await db.users.update(loggedInUser.id, {
        username,
        email,
        password: password
          ? await hashPassword(password)
          : loggedInUser.password,
      });
      loggedInUser.username = username;
      loggedInUser.email = email;

      error = "";
      alert("Informations mises à jour avec succès !");
    } catch (err) {
      error = "Erreur lors de la mise à jour des informations.";
      console.error("Erreur:", err);
    }
  }

  // Fonction pour hasher les mots de passe
  async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
</script>

<main>
  <h1>Modifier mes informations</h1>
  <form on:submit|preventDefault={updateUser}>
    <div>
      <label for="username">Nom d'utilisateur:</label>
      <input type="text" id="username" bind:value={username} required />
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={email} required />
    </div>
    <div>
      <label for="password">Nouveau mot de passe (optionnel):</label>
      <input type="password" id="password" bind:value={password} />
    </div>
    {#if error}
      <p style="color: red;">{error}</p>
    {/if}
    <button type="submit">Mettre à jour</button>
  </form>
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
</style>
