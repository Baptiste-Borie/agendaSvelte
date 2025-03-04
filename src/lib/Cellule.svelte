<script>
  export let date;
</script>

<div class="cellule">
  {#if date}
    <span>{date.getDate()}</span>
  {/if}
</div>

<style>
  .cellule {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ddd;
    min-height: 100px;
    min-width: 100px;
    cursor: pointer;
  }

  .cellule:hover {
    background-color: #f0f0f0;
  }
</style>
