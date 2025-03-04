<script>
    import Month from "./lib/Month.svelte";
    import chevronBack from "./assets/back.png";
    import chevronNext from "./assets/next.png";
    import {format, addMonths, subMonths} from "date-fns";
    import {fr} from "date-fns/locale";
    import Login from './lib/Login.svelte';


    let currentPage = 'login';

    let currentDate = new Date();

  $: currentMonth = format(currentDate, "MMMM-yyyy", { locale: fr });
  $: currentMonthLabel = format(currentDate, "MMMM yyyy", { locale: fr });

    function previousMonth() {
        currentDate = subMonths(currentDate, 1);
    }

    function nextMonth() {
        currentDate = addMonths(currentDate, 1);
    }

    let loggedInUser = null;


    function navigate(page) {
        currentPage = page;
    }

    function handleLogin(user) {
        loggedInUser = user;
        navigate('agenda');
    }

    // Fonction pour gérer la déconnexion
    function handleLogout() {
        loggedInUser = null;
        console.log("deco")
        navigate('login');
    }
</script>

<nav>
    {#if loggedInUser}
        <button onclick={handleLogout}>Déconnexion</button>
    {:else}
        <button onclick={() => navigate('login')}>Connexion</button>
    {/if}
    <button onclick={() => navigate('agenda')}>Agenda</button>
</nav>

<main>
    {#if currentPage === 'login'}
        <Login onLogin={handleLogin} onLogout={handleLogout} />
    {:else if currentPage === 'agenda'}
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
    {/if}
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
