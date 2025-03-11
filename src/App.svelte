<script>
    import Month from "./lib/Month.svelte";
    import chevronBack from "./assets/back.png";
    import chevronNext from "./assets/next.png";
    import Login from "./lib/Login.svelte";
    import Week from "./lib/Week.svelte";
    import SideBarEvents from "./lib/SideBarEvents.svelte";
    import UserProfile from './lib/UserProfile.svelte';
    import {
        format,
        addMonths,
        subMonths,
        startOfWeek,
        subWeeks,
        addWeeks,
    } from "date-fns";
    import {fr} from "date-fns/locale";

    let currentDate = new Date();
    let currentView = "month";
    let currentPage = "login";
    let isSidebarOpen = false;

    let events = [
        {
            event_name: "Event 1",
            description: "Event 1 description",
            date: "2025-03-11",
            time_start: "01:30",
            time_end: "10:30",
        },
        {
            event_name: "Event 2",
            description: "Event 2 description",
            date: "2025-03-11",
            time_start: "09:30",
            time_end: "10:30",
        },
        {
            event_name: "Event 2",
            description: "Event 2 description",
            date: "2025-03-11",
            time_start: "09:30",
            time_end: "10:30",
        },
        {
            event_name: "Event 2",
            description: "Event 2 description",
            date: "2025-03-11",
            time_start: "09:30",
            time_end: "10:30",
        },
        {
            event_name: "Event 3",
            description: "Event 3 description",
            date: "2025-04-11",
            time_start: "09:30",
            time_end: "10:30",
        },
    ];

    $: currentMonth = format(currentDate, "MMMM-yyyy", {locale: fr});
    $: currentMonthLabel = format(currentDate, "MMMM yyyy", {locale: fr});

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

    function previousWeek() {
        currentDate = subWeeks(currentDate, 1);
    }

    function nextWeek() {
        currentDate = addWeeks(currentDate, 1);
    }

    $: startOfCurrentWeek = startOfWeek(currentDate, {weekStartsOn: 1});

    function handleInputChange(event) {
        const input = event.target.value.toLowerCase();
        if (input.includes("semaine")) {
            switchToWeekView();
        } else if (input.includes("mois")) {
            switchToMonthView();
        }
    }
</script>

<!-- 
  <main>
    <button on:click={toggleSidebar}>Open SideBar</button>
    <SideBarEvents {isOpen}/>
  </main> -->

<nav>
    {#if loggedInUser}
        <button onclick={handleLogout}>Déconnexion</button>
        {#if currentPage !== "profile"}
            <button onclick={() => (isSidebarOpen = !isSidebarOpen)}
            >Créer un Evenement
            </button
            >
        {/if}
        <button onclick={() => navigate('profile')}>Modifier mon profil</button>
    {:else}
        <button onclick={() => navigate("login")}>Connexion</button>
    {/if}
    <button onclick={() => navigate("agenda")}>Agenda</button>
</nav>

<main>
    {#if currentPage === "login"}
        <Login onLogin={handleLogin} onLogout={handleLogout}/>
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
                        <img src={chevronBack} alt="Back"/>
                    </button>
                    <button onclick={currentView === "month" ? nextMonth : nextWeek}>
                        <img src={chevronNext} alt="Next"/>
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
                <Month {currentMonth} {events}/>
            {/key}
        {:else if currentView === "week"}
            {#key startOfCurrentWeek}
                <Week {startOfCurrentWeek} {events}/>
            {/key}
        {/if}
    {:else if currentPage === 'profile'}
        <UserProfile {loggedInUser}/>
    {/if}
    {#key loggedInUser}
        <SideBarEvents bind:isOpen={isSidebarOpen} {loggedInUser}></SideBarEvents>
    {/key}
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
</style>
