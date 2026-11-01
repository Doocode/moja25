export interface TempsAttente {
	idArret: string; // Identifiant de l'arrêt. Normalement, si vous obtenez un objet FormTempsAttente, vous connaissez déjà le nom de l'arrêt à afficher à l'utilisateur. Cet identifiant peut en revanche vous servir pour obtenir d'autres informations sur l'arrêt (méthode DR/getDetailsArret).
	latitude: number;
	longitude: number;
	idLigne: string; // Identifiant de la ligne. Ne doit pas être affichée à l'utilisateur. Consultez la documentation de l'objet FormLigne pour plus d'infos.
	numLignePublic: string; // Consultez la documentation de l'objet FormLigne pour plus d'infos.
	couleurFond: string; // Couleur d'arrière-plan caractéristique de la ligne (utilisée sur tous les documents et affichages dynamiques). Format HTML, sans le '#'.
	couleurTexte: string; // Couleur de texte caractéristique de la ligne (utilisée sur tous les documents et affichages dynamiques). Format HTML, sans le '#'.
	sensAller: boolean; // Indique si la ligne circule en sens Aller (true) ou Retour (false).
	destination: string; // Destination du bus ou tram, à afficher à l'utilisateur. Cette destination ne correspond pas forcément à celle d'une variante de la ligne (certains voyages ne circulent pas jusqu'au terminus habituel de la variante).
	precisionDestination: string; // Précisions sur l'itinéraire emprunté pour rejoindre la destination. La plupart du temps, ce champ est une chaine vide. Il est utilisé pour certains voyages qui effectuent un crochet dans leur itinéraire pour desservir un point d'attraction particulier à certaines heures de la journée. Par exemple 'Par Clinique St Vincent'.
	temps: string; // Temps d'attente à afficher à l'utilisateur (exemples: '3 min'). Parfois, cette information est remplacée par l'annonce d'une perturbation ('Travaux', 'Manifestation'...).Nouveauté v1.2 : parfois ce temps peux être une heure d'arrivé, ex: '17h05'
	tempsHTML: string; /*
		Temps d'attente à afficher à l'utilisateur comme pour le champs 'temps',
		avec des balises span pour aider à la mise en forme.
		Les différents éléments sont dans des balises <span> avec des class css
		qui permettront d'agir sur le style. Voici une liste exhaustive de tous
		les styles existant :
		- exemple 1 : <span class='gk-temps'>2</span> <span class='gk-mn'>min</span>
		- exemple 2 : <span class='gk-horaire'>17:22</span>
		- exemple 3 : <span class='gk-mot'>Déviation</span>
		- exemple 4 : <span class='gk-mot'>Bus complet</span>
	*/
	tempsEnSeconde: number; // temps d'attente en seconde. Ne doit pas être affiché directement, mais peut être utilisé pour faire des règles (des if)
	typeDeTemps: number; /*
		Indique le type de données présentes dans 'temps' ou 'tempsHTML' 
		- 0 : temps avant l'arrivé du véhicule ex '2 mn'
		- 1 : horaire d'arrivée ex '17:30' (généralement si le temps d'attente dépasse 59 mn on affiche un horaire)
		- 2 : texte (1 ou 2 mots court)s de remplacement ex 'travaux' ou 'déviation' ou 'bus complet'
	*/
	alternance: boolean; // Optionnel, indique si le texte 'tempsHTML' est à alterner avec le champs tempsHTMLEnAlternance toutes les 3 secondes. Pour l'instant il n'y a qu'un cas d'utilisation, dans tempsHTML il y aura 'bus complet' et dans tempsHTMLEnAlternance '5 mn' (avec les balises span en plus)
	tempsHTMLEnAlternance: string; // Optionnel, cf. description 'alternance', Ex:  <span class='gk-temps'>2</span> <span class='gk-mn'>min</span>
	fiable: boolean; // Indique si le temps d'attente est calculé à l'aide d'informations précises sur la localisation du véhicule (true) ou s'il s'agit d'une estimation basée sur les horaires théoriques (false). Lorsque cette information vaut false, vous devez remplacer le temps d'attente par la mention 'Non localisé', ou bien préciser très clairement que le temps indiqué est théorique.
	numVehicule: string; // Numéro du bus ou de la rame. Cette information n'est pas destinée à être affichée à l'utilisateur, mais elle peut vous servir pour récupérer des informations d'accessibilité (annonces vocales, accessibilité PMR...) en utilisant la méthode DR/getInfosVehicule.
	accessibiliteArret: number; // (Ajouté le 24/05/2018) Indique si l'arrêt est accessible aux personnes à mobilité réduite et aménagé pour permettre leur embarquement/débarquement dans les véhicules (bande d'éveil de vigilance, quai réhaussé). 0: Aucune information n'est disponible. 1: Arrêt accessible. 2: Arrêt difficilement accessible ou non accessible.
	accessibiliteVehicule: number; // (Ajouté le 24/05/2018) Indique si le véhicule est accessible aux personnes à mobilité réduite. 0: Aucune information n'est disponible. 1: Véhicule accessible. 2: Véhicule non accessible. Attention, cette information ne tient pas compte d'un éventuel dysfonctionnement de l'équipement (rampe d'accès).
	affluence: number; // Indique la prévision d'affluence en temps réel à l'arrêt pour ce véhicule de -1 à 2. 0 Faible - Lors de son passage à l'arrêt, il y aura peu de voyageurs à bord. 1 Modérée - Lors de son passage à l'arrêt, il y aura déjà quelques voyageurs à bord: il restera sûrement quelques places assises!. 2 Forte - Lors de son passage à l'arrêt, il y aura déjà beaucoup de voyageurs à bord: il n’y aura probablement plus de places assises. -1 :Indisponible - Il est actuellement impossible de prévoir l’affluence à bord de ce véhicule. -2 :Vous n'avez pas les droits aux informations d'affluences. Contactez-nous
	texteAffluence: string; // Texte qui décrit l'affluence pour les usagers. Exemple, si affluence vaut 0, le texte pourrait être : 'Lors de son passage à votre arrêt, il y aura peu de voyageurs à bord: une place assise vous attend!'
	aideDecisionAffluence: string; // Texte qui peut être vide ou qui peut aider l'usager à prendre une decision en fonction de l'affluence. Exemple si la charge du véhicule est forte, celle du suivant est modérée, le message pourrait être 'Vous avez un peu de temps? Le bus suivant est prévu dans 6 minutes et l’affluence sera modérée.'
	tauxDeCharge: number; // Taux en % qui indique comment le véhicule sera rempli en fonction de sa capacité (100% = bus complet) -1 si l'information n'est pas disponible. -2 :Vous n'avez pas les droits aux informations d'affluences. Contactez-nous.
	idInfoTrafic: number; // 0 s'il n'y a pas d'infoTrafic liée au temps d'attente, id de la FormInfoTrafic. Cela peut permettre d'afficher un contexte quand le temps est remplacé par du texte comme 'déviation' ou 'travaux'
	modeTransport: number; // type de véhicule. 0=Bus; 1=Tramway
	quai: string; // Indique le nom du quai de l'arrêt, si celui-ci est connu. Par exemple 'Quai A'.
}

export interface TempsLieu {
	nomExact: string; // nom précis (corrigé par rapport au nom fourni en paramètre)
	listeTemps: TempsAttente[]; // tableau d'objets TempsAttente. Liste des prochains passages à ce lieu, triés par ligne/sens puis par temps d'attente croissant.
	latitude: number;
	longitude: number;
}
