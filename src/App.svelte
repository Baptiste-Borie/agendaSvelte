<script>
  import Month from "./lib/Month.svelte";
  import chevronBack from "./assets/back.png";
  import chevronNext from "./assets/next.png";
  import Login from "./lib/Login.svelte";
  import Week from "./lib/Week.svelte";
  import {
    format,
    addMonths,
    subMonths,
    startOfWeek,
    endOfWeek,
  } from "date-fns";
  import { fr } from "date-fns/locale";



  let currentDate = new Date();
  let currentView = "month";
  let currentPage = "login";

  $: currentMonth = format(currentDate, "MMMM-yyyy", { locale: fr });
  $: currentMonthLabel = format(currentDate, "MMMM yyyy", { locale: fr });

  let loggedInUser = null;

  function navigate(page) {
    currentPage = page;
  }

  function handleLogin(user) {
    loggedInUser = user;
    navigate("agenda");
  }

  // Fonction pour gérer la déconnexion
  function handleLogout() {
    loggedInUser = null;
    console.log("deco");
    navigate("login");
  }
  function switchToMonthView() {
    currentView = "month";
  }

  function switchToWeekView() {
    currentView = "week";
  }

  function previousMonth() {
    currentDate = subMonths(currentDate, 1);
  }

  function nextMonth() {
    currentDate = addMonths(currentDate, 1);
  }

  $: startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  $: endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });

  function handleInputChange(event) {
    const input = event.target.value.toLowerCase();
    if (input.includes("semaine")) {
      switchToWeekView();
    } else if (input.includes("mois")) {
      switchToMonthView();
    }
  }
</script>

<nav>
  {#if loggedInUser}
    <button onclick={handleLogout}>Déconnexion</button>
  {:else}
    <button onclick={() => navigate("login")}>Connexion</button>
  {/if}
  <button onclick={() => navigate("agenda")}>Agenda</button>
</nav>

<main>
  {#if currentPage === "login"}
    <Login onLogin={handleLogin} onLogout={handleLogout} />
  {:else if currentPage === "agenda"}
    <header class="header">
      <div class="monthSection">
        <div class="buttons">
          <button
            class="todayButton"
            onclick={() => (currentDate = new Date())}
          >
            Aujourd'hui
          </button>
          <button onclick={previousMonth}>
            <img src={chevronBack} alt="Back" />
          </button>
          <button onclick={nextMonth}>
            <img src={chevronNext} alt="Next" />
          </button>
        </div>
        <h1>{currentMonthLabel}</h1>
      </div>
      <div>
        <select
          name="viewSelector"
          id="viewSelector"
          oninput={handleInputChange}
        >
          <option value="mois">Mois</option>
          <option value="semaine">Semaine</option>
        </select>
      </div>
    </header>

    {#if currentView === "month"}
      {#key currentMonth}
        <Month {currentMonth} />
      {/key}
    {:else if currentView === "week"}
      {#key startOfCurrentWeek}
        <Week {currentMonth} />
      {/key}
    {/if}
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  h1 {
    font-size: 2rem;
  }
  .monthSection {
    display: flex;
    align-items: center;
  }
  .todayButton {
    border: 1px solid rgb(69, 69, 69);
    color: rgb(69, 69, 69);
    padding: 10px;
    text-align: center;
    cursor: pointer;
  }
  .todayButton:hover {
    background-color: rgb(69, 69, 69);
    transition: 0.3s;
    color: white;
  }
  .buttons {
    display: flex;
    align-items: center;
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

  .button_event{
    border-radius: 5px;
    background-color: rgb(97, 96, 96);
  }
</style>
