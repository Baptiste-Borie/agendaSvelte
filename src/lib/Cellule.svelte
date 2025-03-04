<script>
  export let date;
  export let today;
  export let view;

  const isToday = (date) => {
    const todayDate = today.setHours(0, 0, 0, 0);
    const targetDate = date.setHours(0, 0, 0, 0);
    return todayDate === targetDate;
  };

  const isWeekView = view === "Week";
</script>

<div class={"cellule " + (isWeekView ? " week" : "month")}>
  {#if date}
    <span class={isToday(date) ? "today" : ""}>{date.getDate()}</span>
  {/if}
</div>

<style>
  .cellule {
    display: flex;
    justify-content: center;
    align-items: start;
    border: 1px solid #ddd;
    cursor: pointer;
  }

  .week {
    min-height: 612px;
    min-width: 125px;
  }

  .month {
    min-height: 100px;
    min-width: 125px;
  }
  .cellule:hover {
    background-color: #f0f0f0;
  }

  .today {
    background-color: #0b57d0;
    color: white;
    border-radius: 99%;
    width: 25px;
    padding: 1px;
  }
</style>
