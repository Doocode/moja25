- Velocité
  - ℹ️ Details d'une station
    - 🟩 FEATURE: Affichage expo
    - 🟦 IMPROVEMENT: [Ouvrir sur Maps] : Retravailler la card ou la remplacer par un menu
    - 🟩 FEATURE: Aperçu sur une mini carte
    - 🟩 FEATURE: Plan de la station (plan de numérotation des bornes & disposition des bornes de la station)
    - 🟩 FEATURE: Ajout de photo d'aperçu de la station
    - 🟦 IMPROVEMENT: Ajouter un fond pour le header/hero
      1. **Gare Viotte** : Horloge florale, tour horloge
      2. **Remparts**
      3. **Battant** : Silhouette des immeuble, cathédrale Ste-Madeleine
      4. **Flore**
      5. **Isenbard**
      6. **Parc Micaud** : arbres du parc, casino/resto/hotel
      7. **Gare de la Mouillère**
      8. Station supprimée ????
      9. **La City** : silhouette batiment City/Canot
      10. **8 septembre** : cathédrale
      11. **Jean Cornet** : fontaine
      12. **Granvelle**
      13. **Victor Hugo**
      14. **Jacobins** : porte Rivotte
      15. **Lecourbe**
      16. **Fontaine Argent**
      17. **Chamars** : Silhouette des immeubles
      18. **Chamars Esplanade** : Silhouette de l'ancien hopital/arsenal
      19. **Revolution**
      20. **Tristan Bernard**
      21. **Liberté**
      22. **Rivotte**
      23. **République**
      24. **Granges**
      25. **Bersot**
      26. **Mairie** : Silhouette du bâtiment Mairie + Tribunal
      27. **Leclerc** : Silhouette des Batiments + Tour Leclerc
      28. **Marie Louise**
      29. **Gibelotte** : silhouette des immeubles
      30. **Leo Lagrange** : stade
      31. **IUT**
      32. **Crous Université** : place de l'université
  - 🗺️ Carte des stations
    - 🟩 FEATURE: Barre de recherche + flyout de completion
    - 🟦 IMPROVEMENT: Nouveau header avec un fond flou (backdrop filter blur) + css mask, inspiré du site https://ardia.dev/
    - 🟩 FEATURE: Réglages de la carte
      - 🟩 FEATURE: Option pour afficher plus/moins de détails sur le tooltip des marqueurs (nom uniquement ou + stats/recap + indicateurs/voyants/etats)
      - 🟩 FEATURE: Action à réaliser au clic sur le marqueur
        - Afficher les infos dans une popup
        - Afficher les infos dans le volet latéral
        - Ouvrir la station
      - 🟩 FEATURE: Style des marqueurs : flat, skeuomorphique, etc.
      - 🟩 FEATURE: Réglages des filtres CSS pour la carte
        - 🟩 FEATURE: Choix de la luminosité (css filter brightness 0% to 100%)
        - 🟩 FEATURE: Choix de du contraste (css filter contrast 0% to 100%)
        - 🟩 FEATURE: Choix de la rotation des couleurs (css filter hue-rotate 0deg to 360deg)
        - 🟩 FEATURE: Choix de la saturation (css filter saturate 0% to 100%)
        - 🟩 FEATURE: Choix de l'echelle de gris (css filter grayscale 0% to 100%)
        - 🟩 FEATURE: Lister quelques presets (couleurs intenses, sépia, monochrome)
  - 🟩 FEATURE: Marqueurs pour faire apparaitre :
    - 🟩 FEATURE: Parking vélos
    - 🟩 FEATURE: Stations de réparation et services pour cyclistes
  - 🟩 FEATURE: Tracé des pistes et itinéraires cyclables + zone restreinte/réglementée
  - 🟩 FEATURE: Calculateur d'itinéraire (à pied, vélo mécanique, vélo électrique, etc.)
    - Popup station
      - 🟦 IMPROVEMENT: Redesign recap stats
      - 🟩 FEATURE: Afficher un message d'alerte (fermé, hors ligne, plein, vide etc.)
      - 🟩 FEATURE: Action "Ouvrir dans un nouvel onglet"
      - 🟩 FEATURE: Action "Démarrer l'itinéraire jusqu'à la station"
    - Calque Capacité/Numéro :
      - 🟦 IMPROVEMENT: Changer la couleur des marqueurs pour un niveau de couleur
    - Calque des décomptes (nb vélos, nb places, etc.)
      - 🟦 IMPROVEMENT: Couleur spécifique lorsque le nombre max (de vélos ou de place) est atteint :
        - Pour les marqueurs des bornes indisponible : couleur violet si le nb est au maximum (=capacité)
        - Pour les marqueurs des bornes/velos disponibles : couleur bleu ou vert foncé si le nb est au maximum (=capacité)
- Bus & tram
  - Lignes
    - 🟦 IMPROVEMENT: Redessiner la vignette des lignes
      - Citadelle
      - Plan B
      - Proxi
      - Ginko Clinique/Hopital/Piscine/Plage Osselle
    - 🟩 FEATURE: Ajouter un volet lateral pour y déplacer la recherche, la navigation et les filtres
      - 🟩 FEATURE: Ajouter la navigation par type de ligne (bus, tram, etc.)
      - 🟩 FEATURE: Ajouter la possibilité de filtrer par type de ligne
    - 🟦 IMPROVEMENT: Ajouter un texte de description (+image) pour chaque section
    - 🟩 FEATURE: Details lignes : afficher la liste des infos trafic de la ligne
    - 🟦 IMPROVEMENT: Details lignes : redesign du header + ajout d'un bouton retour
  - Carte
    - 🟩 FEATURE: Autoriser la rotation de la carte
    - 🟦 IMPROVEMENT: Regrouper les marqueurs proches sur la carte, surtout ceux avec le même nom
    - 🟩 FEATURE: Trajets des lignes
  - Info trafic
    - 🟩 FEATURE: Ajouter une barre de recherche pour rechercher des lignes ou des stations (oui station aussi)
    - 🟩 FEATURE: Ajouter un volet de navigation et l'afficher en priorité sur mobile
  - Recherche
    - 🟦 IMPROVEMENT: Ajout d'un image de fond
    - 🟦 IMPROVEMENT: Center la barre de recherche
    - 🟩 FEATURE: Rappeler l'historique de saisie et/ou visite des stations
    - 🟦 IMPROVEMENT: Stocker la liste des stations dans le localStorage
    - 🟦 IMPROVEMENT: LocalStorage - ajout d'un timestamp pour raffraichir les données 1x par jour
    - 🟦 IMPROVEMENT: Utiliser les données du localStorage en priorité :
      - Le chargement de la page ne doit pas retourner la liste des stations immediatement
      - Une fois la page chargée, faire appel au localStorage pour vérifier si le timestamp est encore valide et mettre à jour la liste des stations si nécessaire
  - Details d'une station
    - 🟩 FEATURE: Vélocité (disponibilité des vélos et places)
    - 🟩 FEATURE: Actualisation en temps réel (tous les 15s)
    - 🟩 FEATURE: Synthèse vocale
    - 🟦 IMPROVEMENT: Adapter l'image "ghost-vehicule" (du message "Aucun passage prévu prochainement") selon le type de station affichée (tram ou bus fantome)
    - 🟩 FEATURE: Regrouper par type de lignes (tram, lianes, urbaines, complementaires, etc.)
    - 🟩 FEATURE: Regrouper par sens de la ligne (aller/retour)
    - 🟩 FEATURE: Afficher/masquer le temps d'attente de certaines lignes
      - Temps d'attente
        - Meilleur gestion de l'aternance des infos (alternance en CSS) sur <WaitingTimeItem> et <DetailsArrival>
        - Unifier l'affichage des temps d'attente de <WaitingTimeItem> et <DetailsArrival>
    - 🟩 FEATURE: Mode expo
      - 🟩 FEATURE: Afficher l'heure prévue sous le temps d'attente du mode expo :
        - dans 6 minutes
        - à 14h51 précisément
    - 🟩 FEATURE: Afficher les infos trafic concernant la station affichée
- 🟩 FEATURE: Carte globale
- 🟩 FEATURE: Recherche globale
- Pages du site
  - 🟩 FEATURE: A propos du site
  - 🟩 FEATURE: Contact
  - 🟩 FEATURE: Mentions légales
  - 🟩 FEATURE: Politique de confidentialité
  - 🟩 FEATURE: Paramètres
    - Apparence
      - 🟩 FEATURE: Langue
      - 🟩 FEATURE: Thème
      - 🟩 FEATURE: BottomNavBar: Masquer les libellés
    - Données
      - 🟩 FEATURE: Exporter les données
      - 🟩 FEATURE: Importer les données
      - 🟩 FEATURE: Supprimer les données
- 🟩 FEATURE: Intégrations pour le mode cycliste
- 🟩 FEATURE: Intégration Parking relais, parking vélos, SNCF, Mobigo, Citiz, Flixbus/Blablacar/Uber
