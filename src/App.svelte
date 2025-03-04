<script>
  import Month from "./lib/Month.svelte";
  import { format } from "date-fns";
  import { fr } from "date-fns/locale";

  let currentMonth = format(new Date(), "MMMM-yyyy", { locale: fr });

  let currentMonthLabel = format(new Date(), "MMMM yyyy", { locale: fr });
</script>

<main>
  <header>
    <h1>{currentMonthLabel}</h1>
  </header>
  <Month {currentMonth} />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
