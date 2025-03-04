<script>
    import { Datepicker } from 'svelte-calendar';
    import { format } from 'date-fns';

    let isOpen = $props();
  
    function openSidebar() {
      isOpen = true;
    }
  
    function closeSidebar() {
      isOpen = false;
    }
  
    // Données de l'événement
    let eventName = $state(""); // Nom de l'événement
    let eventDate = $state(null); // Date sélectionnée
  
    // Fonction pour valider la création de l'événement
    function createEvent() {
      if (eventName && eventDate) {
        console.log("Événement créé :", {
          name: eventName,
          date: format(eventDate, 'yyyy-MM-dd'),
        });
        closeSidebar(); // Fermer la sidebar après création
      } else {
        alert("Veuillez remplir tous les champs !");
      }
    }
  </script>
  
  <style>
    /* Styles de la sidebar */
    .sidebar {
      position: fixed;
      top: 0;
      right: 0;
      width: 300px;
      height: 100vh;
      background-color: #fff;
      box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
      padding: 20px;
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
    }
  
    .sidebar.open {
      transform: translateX(0);
    }
  
    .sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
  
    .sidebar-header h2 {
      margin: 0;
    }
  
    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }
  
    .form-group {
      margin-bottom: 15px;
    }
  
    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
  
    .form-group input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    .form-group .datepicker {
      margin-top: 10px;
    }
  
    .create-btn {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
    .create-btn:hover {
      background-color: #0056b3;
    }
  </style>
  
  <!-- Bouton pour ouvrir la sidebar -->
  <button onclick={openSidebar}>Créer un événement</button>
  
  <!-- Sidebar -->
  <div class="sidebar {isOpen ? 'open' : ''}">
    <div class="sidebar-header">
      <h2>Créer un événement</h2>
      <button class="close-btn" onclick={closeSidebar}>×</button>
    </div>
  
    <!-- Formulaire de création d'événement -->
    <div class="form-group">
      <label for="event-name">Nom de l'événement</label>
      <input
        id="event-name"
        type="text"
        bind:value={eventName}
        placeholder="Nom de l'événement"
      />
    </div>
  
    <div class="form-group">
      <label for="event-date">Date de l'événement</label>
      <div class="datepicker">
        <Datepicker bind:selected={eventDate} />
      </div>
    </div>
  
    <button class="create-btn" onclick={createEvent}>Créer</button>
  </div>