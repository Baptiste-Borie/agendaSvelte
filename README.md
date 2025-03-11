# Agenda Simple

Un projet de gestion d'agenda simple, stockant les événements dans la 
base de données du navigateur (IndexedDB). L'application permet de créer, 
modifier et afficher des événements avec des détails tels que le titre, 
la date/heure de début, la durée, la couleur et une description.

## Fonctionnalités

- **Création d'événements** : Ajoutez des événements avec les détails suivants :
    - Titre
    - Date et heure de début
    - Durée ou date/heure de fin (optionnelle)
    - Couleur
    - Description courte
- **Affichage mensuel** : Les événements sont affichés par mois, avec une semaine par ligne.
- **Composant réutilisable** : Chaque jour est représenté par un composant `DayCell`, réutilisé pour chaque jour du mois.
- **Détails des événements** : Cliquez sur un événement pour afficher une modale avec les détails complets et un bouton pour modifier l'événement.
- **Stockage local** : Les événements sont stockés dans la base de données IndexedDB du navigateur pour une persistance des données.
