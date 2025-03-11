<script>
  import { format } from "date-fns";

  export let isOpen;

  let eventName = "";
  let eventDate = null;
  let shortDescription = "";

  function closeSideBar() {
    isOpen = false;
  }

  function createEvent() {
    if (eventName && eventDate) {
      console.log("Événement créé :", {
        name: eventName,
        date: format(eventDate, "yyyy-MM-dd"),
      });
      closeSideBar();
    } else {
      alert("Veuillez remplir tous les champs !");
    }
  }
</script>

{#if isOpen}
  <div class="sidenav">
    <button onclick={closeSideBar} class="close-btn">X</button>

    <h2>Créez votre prochain événement</h2>

    <div class="form-group">
      <label for="event-name">Nom de l'événement</label>
      <textarea
        id="event-name"
        bind:value={eventName}
        placeholder="Nom de l'événement"
        class="input-field"
      ></textarea>
    </div>
    <div class="form-group">
      <label for="short-description">Description courte</label>
      <textarea
        id="short-description"
        bind:value={shortDescription}
        placeholder="Description courte"
        class="input-field"
      ></textarea>
    </div>
    <div class="form-group">
      <label for="event-date">Date de l'événement</label>
    </div>
    <button onclick={createEvent} class="create-btn">Créer</button>
  </div>
{/if}

<style>
  .sidenav {
    height: 100%;
    width: 300px;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    background-color: #ffff;
    padding: 20px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  }
  .close-btn {
    background: none;
    border: none;
    color: black;
    font-size: 1.5rem;
    cursor: pointer;
    position: absolute;
    top: 0px;
    right: 10px;
    outline: none;
  }

  .close-btn:hover {
    color: #e74c3c;
  }

  h2 {
    color: white;
    margin-bottom: 20px;
    font-size: 1.5rem;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    color: white;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .input-field {
    width: 80%;
    padding: 10px;
    border: 1px solid #34495e;
    border-radius: 4px;
    background-color: #34495e;
    color: white;
    font-size: 1rem;
    resize: vertical;
  }

  .input-field::placeholder {
    color: #acb2b6;
  }

  .create-btn {
    width: 100%;
    padding: 10px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
  }

  .create-btn:hover {
    background-color: #2980b9;
  }
</style>
