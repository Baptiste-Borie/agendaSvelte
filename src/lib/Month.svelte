<script>
  import Cellule from "./Cellule.svelte";
  import {
    parse,
    startOfMonth,
    startOfWeek,
    addDays,
    isSameDay,
  } from "date-fns";
  import { fr } from "date-fns/locale";

  export let currentMonth;
  export let events = [];
  export let onCellClick;
  export let onModalClick;
  export let isEditing;
  export let clearAllFieldsProp;

  let parsedDate = parse(currentMonth, "MMMM-yyyy", new Date(), { locale: fr });
  let firstDayOfMonth = startOfMonth(parsedDate);
  let firstDisplayedDay = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });

  let days = Array.from({ length: 42 }, (_, i) =>
    addDays(firstDisplayedDay, i)
  );

  const header = ["L", "M", "M", "J", "V", "S", "D"];
  let today = new Date();

  function getEventsForDay(day) {
    return events.filter((event) =>
      isSameDay(day, parse(event.eventDate, "yyyy-MM-dd", new Date()))
    );
  }
</script>

<div class="month-grid">
  {#each header as head}
    <div class="header">{head}</div>
  {/each}
  {#each days as day}
    <Cellule date={day} {today} view={"Month"} events={getEventsForDay(day)} onCellClick={onCellClick} onModalClick = {onModalClick}  {clearAllFieldsProp} />
  {/each}
</div>

<style>
  .month-grid {
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
  }
</style>
