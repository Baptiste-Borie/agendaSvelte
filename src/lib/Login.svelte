<script>
  import db from "./db.js";
  import { onMount } from "svelte";
  import bcrypt from "bcryptjs"; // Pour hasher les mdp

  export let onLogin;
  export let onLogout;

  let email = "";
  let username = "";
  let password = "";
  let error = "";
  let loggedInUser = null;
  let isRegistering = false;

  /**
   * Fonction pour hasher les mots de passe
   * @param password
   */
  async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  /**
   * Fonction pour comparer le mot de passe non hasher avec le hasher
   * @param inputPassword mot de passe non hasher,
   * @param hashedPassword mot de passe hasher
   */
  async function comparePasswords(inputPassword, hashedPassword) {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }

  /**
   *  Regex pour valider un email
   *  @param email
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   *  Login
   */
  async function login() {
    if (!isValidEmail(email)) {
      error = "Veuillez entrer une adresse email valide";
      return;
    }
    try {
      const user = await db.users.where("email").equals(email).first();
      if (user && (await comparePasswords(password, user.password))) {
        loggedInUser = user;
        error = "";
        onLogin(loggedInUser);
      } else {
        error = "Email ou mot de passe incorrect";
      }
    } catch (err) {
      error = "Erreur lors de la connexion";
      console.error("Erreur:", err);
    }
  }

  /**
   * Création d'un utilisateur et vérification de l'existance de cet utilisateur avant la création
   */
  async function register() {
    if (!isValidEmail(email)) {
      error = "Veuillez entrer une adresse email valide";
      return;
    }
    try {
      const existingUser = await db.users.where("email").equals(email).first();
      if (existingUser) {
        error = "Ce email est déjà utilisé";
        return;
      }
      const hashedPassword = await hashPassword(password);
      await db.users.add({ username, email, password: hashedPassword });
      error = "";
      isRegistering = false;
    } catch (err) {
      error = "Erreur lors de l'inscription";
      console.error("Erreur:", err);
    }
  }

  /**
   * Logout
   */
  function logout() {
    loggedInUser = null;
    username = "";
    email = "";
    password = "";
    error = "";
    onLogout();
  }

  /**
   * Permet l'affichage de la bdd dans la console
   */
  // onMount(async () => {
  //     const allUsers = await db.users.toArray();
  // });
</script>

<main>
  <h1>{isRegistering ? "Inscription" : "Connexion"}</h1>
  {#if loggedInUser}
    <p>Bienvenue, {loggedInUser.username}!</p>
    <button on:click={logout}>Se déconnecter</button>
  {:else}
    <form on:submit|preventDefault={isRegistering ? register : login}>
      {#if isRegistering}
        <div>
          <label for="username">Nom d'utilisateur:</label>
          <input type="text" id="username" bind:value={username} required />
        </div>
      {/if}
      <div>
        <label for="email">Email:</label>
        <input
          type="text"
          id="email"
          bind:value={email}
          class:invalid={!isValidEmail(email) && email}
          required
        />
      </div>
      <div>
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" bind:value={password} required />
      </div>
      {#if error}
        <p style="color: red;">{error}</p>
      {/if}
      <button type="submit"
        >{isRegistering ? "S'inscrire" : "Se connecter"}</button
      >
    </form>
    <p>
      {#if isRegistering}
        Déjà un compte ? <a
          href="#"
          on:click|preventDefault={() => (isRegistering = false)}
          >Se connecter</a
        >
      {:else}
        Pas de compte ? <a
          href="#"
          on:click|preventDefault={() => (isRegistering = true)}>S'inscrire</a
        >
      {/if}
    </p>
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

  a {
    color: #007bff;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .invalid {
    border-color: red;
  }
</style>
