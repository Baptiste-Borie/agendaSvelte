<script>
  import Month from "./lib/Month.svelte";
  import chevronBack from "./assets/back.png";
  import chevronNext from "./assets/next.png";
  import db from "./lib/db.js";
  import Login from "./lib/Login.svelte";
  import Week from "./lib/Week.svelte";
  import SideBarEvents from "./lib/SideBarEvents.svelte";
  import Profile from "./lib/Profile.svelte";
  import {
    format,
    addMonths,
    subMonths,
    startOfWeek,
    subWeeks,
    addWeeks,
  } from "date-fns";
  import { fr } from "date-fns/locale";

  let currentDate = new Date();
  let currentView = "month";
  let currentPage = "login";
  let isSidebarOpen = false;
  let events = [];
  let isEditing = false;
  let selectedDate = null;
  let selectedTitle = "";
  let selectedDescription = "";
  let selectedHourStart = null; 
  let selectedHourEnd = null;
  let selectedColor = null; 
  let selectedEventId = null;


  

  $: currentMonth = format(currentDate, "MMMM-yyyy", { locale: fr });
  $: currentMonthLabel = format(currentDate, "MMMM yyyy", { locale: fr });

  let loggedInUser = null;

  function navigate(page) {
    currentPage = page;
  }

  function handleLogin(user) {
    loggedInUser = user;
    navigate("agenda");
    fetchEvents();
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

  function previousWeek() {
    currentDate = subWeeks(currentDate, 1);
  }

  function nextWeek() {
    currentDate = addWeeks(currentDate, 1);
  }

  $: startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });

  function handleInputChange(event) {
    const input = event.target.value.toLowerCase();
    if (input.includes("semaine")) {
      switchToWeekView();
    } else if (input.includes("mois")) {
      switchToMonthView();
    }
  }

  function handleSidebarClose() {
    isSidebarOpen = false;
    isEditing = false;
    clearAllFields();
  }
  
  function handleButtonSidebarClose(action){
    handleSidebarClose();
    action();
  }

  function clearAllFields() {
  selectedTitle = "";
  selectedDescription = "";
  selectedHourStart = null;
  selectedHourEnd = null;
  selectedColor = null;
  selectedEventId = null;
}

  function openEditSidebar(event) {
    isEditing = true;
    isSidebarOpen = true;

    selectedDate = event.date;
    selectedTitle = event.eventName; 
    selectedDescription = event.description;
    selectedHourStart = event.hour_start;
    selectedHourEnd = event.hour_end;
    selectedColor = event.color;
    selectedEventId = event.id;
  }

  function handleCellClick(event) {
    isEditing = false;
    selectedDate = event.date;
    isSidebarOpen = true;
  }

  function handleButtonCreateEvent(){
    if(selectedDate != null){
      selectedDate = null;
    }
    if (isSidebarOpen == false) {
      isSidebarOpen = true;
      isEditing = false;
      clearAllFields();
    }
  }



  async function fetchEvents() {
    try {
      const eventsData = await db.events.toArray();
      events = eventsData;
    } catch (error) {
      console.error("Erreur lors de la récupération des événements", error);
    }
  }
</script>

<nav>
  {#if loggedInUser}
    <button onclick={() => handleButtonSidebarClose(handleLogout)}>Déconnexion</button>
    {#if currentPage !== "profile"}
      <button onclick={() => handleButtonCreateEvent() }
        >Créer un événement
      </button>
    {/if}
    <button onclick={() => handleButtonSidebarClose(() => navigate("profile"))}>Modifier mon profil</button>
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
          <button
            onclick={currentView === "month" ? previousMonth : previousWeek}
          >
            <img src={chevronBack} alt="Back" />
          </button>
          <button onclick={currentView === "month" ? nextMonth : nextWeek}>
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
        <Month {currentMonth} {events} onCellClick={handleCellClick} onModalClick={openEditSidebar} {isEditing}/>
      {/key}
    {:else if currentView === "week"}
      {#key startOfCurrentWeek}
        <Week {startOfCurrentWeek} {events} onCellClick={handleCellClick} onModalClick={openEditSidebar} {isEditing}/>
      {/key}
    {/if}
  {:else if currentPage === "profile"}
    <Profile {loggedInUser} />
  {/if}
  {#key loggedInUser}
  <SideBarEvents
    bind:isOpen={isSidebarOpen}
    {fetchEvents}
    {loggedInUser}
    onClose={handleSidebarClose}
    {selectedDate}
    {isEditing}
    {selectedTitle}
    {selectedDescription}
    {selectedHourStart}
    {selectedHourEnd}
    {selectedColor}
    {selectedEventId}
  />
  {/key}
</main>

<style>
  main {
    display: flex;
    background-color: white;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: black;
  }

  button {
    color: black;
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
</style>
