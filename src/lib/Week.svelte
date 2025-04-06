<script>
  import Cellule from "./Cellule.svelte";
  import { addDays, isSameDay, parse } from "date-fns";

  export let loggedInUser;
  export let startOfCurrentWeek;
  export let events = [];
  export let fetchEvents;
  export let onCellClick;
  export let onModalClick;
  export let isEditing;
  export let clearAllFieldsProp;

  let days = Array.from({ length: 7 }, (_, i) =>
    addDays(startOfCurrentWeek, i)
  );

  const header = ["L", "M", "M", "J", "V", "S", "D"];
  let today = new Date();

  /**
   * Filtre les événements pour n'afficher que ceux du jour spécifié
   * @param {Date} day - La date à comparer
   * @returns {Array} Liste des événements du jour
   */
  function getEventsForDay(day) {
    return events.filter((event) =>
      isSameDay(day, parse(event.eventDate, "yyyy-MM-dd", new Date()))
    );
  }
</script>

<div class="week-grid">
  {#each header as head}
    <div class="header">{head}</div>
  {/each}
  {#each days as day}
    <Cellule
      date={day}
      {today}
      view={"Week"}
      events={getEventsForDay(day)}
      {onCellClick}
      {onModalClick}
      {clearAllFieldsProp}
      {loggedInUser}
      {fetchEvents}
    />
  {/each}
</div>

<style>
  .week-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border: 1px solid #ddd;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ddd;
    background-color: #f0f0f0;
    font-weight: bold;
  }
</style>
