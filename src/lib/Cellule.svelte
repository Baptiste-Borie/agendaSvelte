<script>
  export let date;
  export let today;
  export let view;
  export let events = [];
  export let onCellClick; 
  let isModalOpen = false;
  let selectedEvent = null;

  const isToday = (date) => {
    const todayDate = today.setHours(0, 0, 0, 0);
    const targetDate = date.setHours(0, 0, 0, 0);
    return todayDate === targetDate;
  };

  const isWeekView = view === "Week";

  const openModal = (event) => {
    selectedEvent = event;
    isModalOpen = true;
  };

  const closeModal = () => {
    isModalOpen = false;
    selectedEvent = null;
  };

  const formatDate = (date) => {
    const options = { weekday: "long", day: "numeric", month: "long" };
    return new Intl.DateTimeFormat("fr-FR", options).format(date);
  };

  function handleClick() {
    onCellClick({date})
  }

  function handleKeydown(event) {
    // Permet d'activer l'élément avec la touche "Entrée" ou "Espace"
    if (event.key === "Enter" || event.key === " ") {
      handleClick();
    }
  }
</script>


<div class={"cellule " + (isWeekView ? "week" : "month")} onclick={handleClick} onkeydown={handleKeydown}  tabindex="0" role="button"> 
  {#if date}
    <span class={isToday(date) ? "today" : ""} >{date.getDate()}</span>
  {/if}

  {#if events.length > 0}
    <div class="event-container">
      {#each events as event}
        <button
          class="event"
          style="background-color: {event.color}"
          onclick={(e) => {
            e.stopPropagation();
            openModal(event);
          }}
        >
          <strong>{event.hour_start}</strong> - {event.eventName}
        </button>
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
</style>
