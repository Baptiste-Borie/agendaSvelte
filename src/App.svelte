<script>
    import Month from "./lib/Month.svelte";
    import {format} from "date-fns";
    import {fr} from "date-fns/locale";
    import Login from './lib/Login.svelte';


    let currentPage = 'login';

    let currentMonth = format(new Date(), "MMMM-yyyy", {locale: fr});

    let currentMonthLabel = format(new Date(), "MMMM yyyy", {locale: fr});

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
        <button on:click={handleLogout}>Déconnexion</button>
    {:else}
        <button on:click={() => navigate('login')}>Connexion</button>
    {/if}
    <button on:click={() => navigate('agenda')}>Agenda</button>
</nav>

<main>
    {#if currentPage === 'login'}
        <Login onLogin={handleLogin} onLogout={handleLogout} />
    {:else if currentPage === 'agenda'}
        <header>
            <h1>{currentMonthLabel}</h1>
        </header>
        <Month {currentMonth}/>
    {/if}

</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
