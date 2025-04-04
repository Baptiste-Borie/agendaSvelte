<script>
  import { format } from "date-fns";
  import db from './db.js';

  export let loggedInUser;
  export let date;
  export let today;
  export let view;
  export let events = [];
  export let onCellClick;
  export let onModalClick;
  // export let isEditing;
  export let clearAllFieldsProp;
  let isModalOpen = false;
  let isConfirmModalOpen = false;
  let selectedEvent = null;
  let eventIdToDelete = null;

  const isToday = (date) => {
    const todayDate = today.setHours(0, 0, 0, 0);
    const targetDate = date.setHours(0, 0, 0, 0);
    return todayDate === targetDate;
  };

  const isWeekView = view === "Week";

  // code deepseek: il ajoute la propriété date à event au moment où on ouvre la modal,
  // parce que sinon lorsqu'on modifie un event on récupére pas la date
  // obliger de passer par cette fonction pour modifier un event pour l'instant
  // parce que on peut pas modifier un event autrement. Donc j'ajoute la propriété date ici, mais du coup c'est pas optimal. Mais ça fonctionne.


  /**
   * Ouvre un modal et prépare l'événement sélectionné pour l'affichage
   * @param {Object} event - L'objet événement à afficher dans le modal
   * @param {Date} event.eventDate - La date de l'événement à formater
   * @returns {void} - Modifie la variable selectedEvent avec l'événement formaté
   */
  const openModal = (event) => {
    selectedEvent = {
    ...event,
    date: format(event.eventDate, "yyyy-MM-dd"),
  };

  console.log(date)
    isModalOpen = true;
  };

  /**
   * Ferme le modal et réinitialise l'événement sélectionné (optionnel)
   * @returns {void} - Modifie l'état `isModalOpen` à `false`
   * @example
   * closeModal(); // Ferme le modal
   */
  const closeModal = () => {
    isModalOpen = false;
    // selectedEvent = null;
  };

  /**
   * Formate une date en texte lisible en français (ex: "lundi 25 octobre")
   * @param {Date} date - La date à formater
   * @returns {string} - La date formatée selon les conventions françaises
   */
  const formatDate = (date) => {
    const options = { weekday: "long", day: "numeric", month: "long" };
    return new Intl.DateTimeFormat("fr-FR", options).format(date);
  };

  /**
   * Gère le clic sur une cellule du calendrier en formatant la date et en déclenchant un callback
   * @returns {void}
   */
  function handleClick() {
    const formattedDate = format(date, "yyyy-MM-dd");
    onCellClick({ date:formattedDate });
  }

  /**
   * Gère les événements clavier pour activer un élément via Entrée ou Espace
   * @param {KeyboardEvent} event - L'événement clavier déclenché
   * @returns {void}
   *
   */
   function handleKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      handleClick();
    }
  }

  /**
   * Prépare la suppression d'un événement en ouvrant un modal de confirmation
   *
   * @param {string|number} eventId - L'identifiant unique de l'événement à supprimer
   */
  function confirmDelete(eventId) {
    eventIdToDelete = eventId;
    isConfirmModalOpen = true;
  }

  /**
   * Supprime un événement de la base de données
   */
  async function deleteEvent() {
    try {
      await db.events.delete(eventIdToDelete);
      events = events.filter(event => event.id !== eventIdToDelete);
      closeModal();
      isConfirmModalOpen = false;
    } catch (err) {
      console.error("Erreur lors de la suppression de l'événement :", err);
    }
  }
</script>

<div class={"cellule " + (isWeekView ? "week" : "month")} onclick={() => { handleClick(); clearAllFieldsProp(); }} onkeydown={handleKeydown} tabindex="0" role="button">
  {#if date}
    <span class={isToday(date) ? "today" : ""}>{date.getDate()}</span>
  {/if}

  {#if events.length > 0}
    <div class="event-container">
      {#each events as event}
        {#if loggedInUser.id === event.userId}
          <button
                  class="event"
                  style="background-color: {event.color}"
                  onclick={(e) => {
              e.stopPropagation();
              openModal(event);
              // onModalClick(event);
            }}
          >
            <strong>{event.hour_start}</strong> - {event.eventName}
          </button>
          {/if}
      {/each}
    </div>
  {/if}
</div>

{#if isModalOpen}
  <div class="modal">
    <div class="modal-content">
      <button class="close" onclick={closeModal}>×</button>
      <div>
        <h2>{selectedEvent.eventName}</h2>
        <div class="tempo">
          <p>{formatDate(new Date(selectedEvent.eventDate))}</p>
          <div class="time">
            <p>{selectedEvent.hour_start}</p>
            <p>{selectedEvent.hour_end}</p>
          </div>
        </div>
        <hr />
        <p>{selectedEvent.description}</p>
        <button
          onclick={() => {
            onModalClick(selectedEvent);
            closeModal();
          }}>Modifier</button>
        <button class="btn-red" onclick={() => confirmDelete(selectedEvent.id)}>
          Supprimer
        </button>
      </div>
    </div>
  </div>
{/if}

{#if isConfirmModalOpen}
  <div class="modal">
    <div class="modal-content">
      <h2>Confirmer la suppression</h2>
      <p>Êtes-vous sûr de vouloir supprimer cet événement ?</p>
      <div>
        <button class="btn-red" onclick={deleteEvent}>
          Oui, supprimer
        </button>
        <button onclick={() => isConfirmModalOpen = false}>
          Annuler
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .cellule {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    border: 1px solid #ddd;
    cursor: pointer;
    position: relative;
    padding: 4px;
    overflow: hidden;
  }

  .week {
    height: 612px;
    width: 125px;
  }

  .month {
    height: 100px;
    width: 125px;
  }

  .cellule:hover {
    background-color: #f0f0f0;
  }

  .today {
    background-color: #0b57d0;
    color: white;
    border-radius: 99%;
    width: 25px;
    padding: 1px;
    text-align: center;
  }

  .event-container {
    width: 100%;
    margin: 0 4px;
  }

  .event {
    color: white;
    font-size: 12px;
    padding: 2px 4px;
    margin: 2px;
    border-radius: 4px;
    text-align: center;
    width: 90%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  /* Styles de la modal */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 500px;
    text-align: start;
    position: relative;
  }

  .modal-content h2 {
    font-size: 2rem;
  }

  .tempo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
  }

  .time {
    display: flex;
    gap: 5px;
  }

  .time > * {
    padding: 5px;
    color: #878787;
    background-color: #f0f0f0;
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #333;
    font-weight: bold;
  }

  .btn-red {
    background-color: red;
    color: white;
  }
</style>
