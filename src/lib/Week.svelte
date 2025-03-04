<script>
  import Cellule from "./Cellule.svelte";
  import { parse, startOfMonth, startOfWeek, addDays, format } from "date-fns";
  import { fr } from "date-fns/locale";

  export let currentMonth;

  let parsedDate = parse(currentMonth, "MMMM-yyyy", new Date(), { locale: fr });
  let firstDayOfMonth = startOfMonth(parsedDate);
  let firstDisplayedDay = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });

  let days = Array.from({ length: 7 }, (_, i) => addDays(firstDisplayedDay, i));

  let today = new Date();
</script>

<div class="month-grid">
  {#each days as day}
    <Cellule date={day} {today} view={"Week"} />
  {/each}
</div>

<style>
  .month-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border: 1px solid #ddd;
  }
</style>
