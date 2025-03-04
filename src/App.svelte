<script>
  import Month from "./lib/Month.svelte";
  import chevronBack from "./assets/back.png";
  import chevronNext from "./assets/next.png";
  import { format, addMonths, subMonths } from "date-fns";
  import { fr } from "date-fns/locale";



  let currentDate = new Date();

  $: currentMonth = format(currentDate, "MMMM-yyyy", { locale: fr });
  $: currentMonthLabel = format(currentDate, "MMMM yyyy", { locale: fr });

  function previousMonth() {
    currentDate = subMonths(currentDate, 1);
  }

  function nextMonth() {
    currentDate = addMonths(currentDate, 1);
  }
</script>

<main>
  <header>
    <div>
      <button onclick={previousMonth}>
        <img src={chevronBack} alt="Back" />
      </button>
      <button onclick={nextMonth}>
        <img src={chevronNext} alt="Next" />
      </button>
    </div>
    <h1>
      {currentMonthLabel}
    </h1>
  </header>
  {#key currentMonth}
    <Month {currentMonth} />
  {/key}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
  }
  img {
    width: 30px;
    height: 30px;
  }
</style>
