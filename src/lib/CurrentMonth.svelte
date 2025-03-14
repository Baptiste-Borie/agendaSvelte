<script>
  export let currentMonth;
  export let updateDateParent;
  $: [currentMonthLabel, currentYear] = currentMonth.split("-");
  $: currentMonthLabelCapitalize =
    currentMonthLabel.charAt(0).toUpperCase() + currentMonthLabel.slice(1);

  let isDateModalOpen = false;

  $: selectedMonth = currentMonthLabel;
  $: selectedYear = currentYear;

  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const years = Array.from({ length: 200 }, (_, i) =>
    (new Date().getFullYear() - 100 + i).toString()
  );

  function updateDate() {
    currentMonth = `${selectedMonth}-${selectedYear}`;
    updateDateParent(currentMonth);
    isDateModalOpen = false;
  }

  function openModal() {
    selectedMonth = currentMonthLabel;
    selectedYear = currentYear;
    isDateModalOpen = true;
  }
</script>

<div>
  <button on:click={openModal}>
    {currentMonthLabelCapitalize}
    {currentYear}
  </button>
</div>

{#if isDateModalOpen}
  <div class="modal">
    <div class="modal-content">
      <button class="close" on:click={() => (isDateModalOpen = false)}>×</button
      >
      <h2>Choisir une date</h2>
      <div class="selectors">
        <select bind:value={selectedMonth}>
          {#each months as month}
            <option value={month}>{month}</option>
          {/each}
        </select>
        <select bind:value={selectedYear}>
          {#each years as year}
            <option value={year}>{year}</option>
          {/each}
        </select>
      </div>
      <button on:click={updateDate}>Valider</button>
    </div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 400px;
    text-align: center;
    position: relative;
  }

  .selectors {
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
  }

  select {
    padding: 8px;
    font-size: 1rem;
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
</style>
