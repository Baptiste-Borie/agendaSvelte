<script>
  import db from "./db.js";
  import { onMount } from "svelte";

  export let loggedInUser;
  export let fetchEvents;
  export let isOpen;
  export let onClose;
  export let isEditing;
  export let selectedDate; // selectedDate est déjà au format YYYY-MM-DD
  export let selectedTitle;
  export let selectedDescription;
  export let selectedHourStart;
  export let selectedHourEnd;
  export let selectedColor;
  export let selectedEventId;

  let userId = "";

  onMount(() => {
    if (loggedInUser) {
      userId = loggedInUser.id;
    }
  });

  /**
   * Ferme la sidebar, déclenche onClose et réinitialise les champs.
   */
  function closeSideBar() {
    isOpen = false;
    onClose();
    clearAllFields();
  }

  function clearAllFields() {
    selectedTitle = "";
    selectedDescription = "";
    selectedHourStart = null;
    selectedHourEnd = null;
    selectedColor = null;
    selectedEventId = null;
    selectedDate = null;
  }

  /**
   * Gère la soumission du formulaire d'événement (création ou édition)
   */
  async function handleSubmit() {
    try {
      console.log("selectedTitle:", selectedTitle);
      console.log("selectedDate:", selectedDate);

      if (!selectedTitle || !selectedDate) {
        alert("Veuillez choisir au moins une date et un titre pour votre événement !");
        return;
      }

      if (isEditing && selectedEventId) {
        await db.events.update(selectedEventId, {
          eventName: selectedTitle,
          description: selectedDescription,
          eventDate: selectedDate, 
          hour_start: selectedHourStart,
          hour_end: selectedHourEnd,
          color: selectedColor,
          userId,
        });
      } else {
        await db.events.add({
          eventName: selectedTitle,
          description: selectedDescription,
          eventDate: selectedDate, 
          hour_start: selectedHourStart,
          hour_end: selectedHourEnd,
          color: selectedColor,
          userId,
        });
      }
      fetchEvents();
      closeSideBar();
    } catch (error) {
      console.error("Erreur lors de la création/modification de l'événement :", error);
      alert("Une erreur est survenue lors de la création/modification de l'événement.");
    }
  }
</script>

{#if isOpen}
  <div class="sidenav">
    <button onclick={closeSideBar} class="close-btn">X</button>

    <h2>{isEditing ? "Modifier l'événement" : "Créer un événement"}</h2>

    <div class="form-group">
      <label for="event-name">Nom de l'événement</label>
      <textarea
        id="event-name"
        bind:value={selectedTitle}
        placeholder="Nom de l'événement"
        class="input-field"
        required
      ></textarea>
    </div>

    <div class="form-group">
      <label for="short-description">Description courte</label>
      <textarea
        id="short-description"
        bind:value={selectedDescription}
        placeholder="Description courte (facultatif)"
        class="input-field"
      ></textarea>
    </div>

    <div class="form-group">
      <label for="event-date">Date de l'événement</label>
      <input
        type="date"
        id="event-date"
        bind:value={selectedDate} 
        class="input-field"
        required
      />
    </div>

    <div class="form-group">
      <label for="event-start">Heure de début</label>
      <input
        type="time"
        id="event-start"
        bind:value={selectedHourStart}
        class="input-field"
        required
      />
    </div>

    <div class="form-group">
      <label for="event-end">Heure de fin</label>
      <input
        type="time"
        id="event-end"
        bind:value={selectedHourEnd}
        class="input-field"
      />
    </div>

    <div class="form-group">
      <label for="event-color">Couleur de l'événement</label>
      <input
        type="color"
        id="event-color"
        bind:value={selectedColor}
        class="input-field"
      />
    </div>

    <button onclick={handleSubmit} class="submit-btn">
      {isEditing ? "Modifier l'événement" : "Créer l'événement"}
    </button>
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
    background-color: #000408;
    padding: 20px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  }

  .close-btn {
    background: none;
    border: none;
    color: white;
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
</style>