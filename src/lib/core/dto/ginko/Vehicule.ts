export interface VehiculeDR {
	num: string; // Identifiant du véhicule, inscrit à l'extérieur des véhicules, à l'avant et à l'arrière. Il est possible que certains véhicules soient numérotés avec des lettres ou d'autres caractères.
	affichageDynamique: boolean; // Indique si le véhicule est équipé d'afficheurs dynamiques annonçant les prochaines stations desservies. Attention, cette information ne tient pas compte d'un éventuel dysfonctionnement de l'équipement.
	annoncesSonores: boolean; // Indique si le véhicule est équipé d'un dispositif d'annonces sonores des prochaines stations desservies. Attention, cette information ne tient pas compte d'un éventuel dysfonctionnement de l'équipement.
	climatisation: boolean; // Indique si le véhicule est climatisé. Attention, cette information ne tient pas compte d'un éventuel dysfonctionnement de l'équipement.
	prisesUSB: boolean; // Indique si le véhicule est équipé de prises USB accessibles aux voyageurs et permettant le rechargement d'appareils (smartphones par exemple). Attention, cette information ne tient pas compte d'un éventuel dysfonctionnement de l'équipement.
	accessiblite: number; // Indique si le véhicule est accessible aux personnes à mobilité réduite. 0: Aucune information n'est disponible. 1: Véhicule accessible. 2: Véhicule non accessible. Attention, cette information ne tient pas compte d'un éventuel dysfonctionnement de l'équipement (rampe d'accès).
	energie: number; // Indique le type d'énergie qu'utilise le véhicule : 0 pas d'info, 1 Véhicule au gazole, 2 Véhicule au gaz naturel, 3 Véhicule hybride (électrique + gaz), 4 Véhicule électrique. Attention, cette information ne tient pas compte d'un éventuel dysfonctionnement de l'équipement.
	typeVehicule: string; // Indique le type de véhicule (Bus articulé, Bus moyenne capacité, Bus Standard, Tramway 22 mètres, Tramway 33 mètres)
}

export interface VehiculeTR {
	num: string; // Identifiant du véhicule, inscrit à l'extérieur des véhicules, à l'avant et à l'arrière. Il est possible que certains véhicules soient numérotés avec des lettres ou d'autres caractères.
	affluence: number; /*
		Indique l'affluence en temps réel pour ce véhicule, de -1 à 2.
			-1: "Indisponible - Il est actuellement impossible de connaître l’affluence à bord de ce véhicule"
			-2: "Vous n'avez pas les droits d'accès à l'affluence dans les véhicules"
			0: "Faible - il y a peu de voyageurs à bord"
			1: "Modérée - il y a déjà quelques voyageurs à bord, il reste sûrement quelques places assises"
			2: "Forte - il y a déjà beaucoup de voyageurs à bord, il n’y a probablement plus de places assises"
	*/
	texteAffluence: string; // Texte qui décrit l'affluence pour les usagers. Exemple, si affluence vaut 0, le texte pourrait être 'Il y a peu de voyageurs à bord de ce véhicule actuellement'
	nbPassagersABord: number; // Indique le nombre de passagers à bord du véhicule. -1 si l'information n'est pas disponible. -2 si vous n'avez pas les droits nécessaires.
	tauxDeCharge: number; // Taux en % qui indique comment le véhicule est rempli en fonction de sa capacité (100% = bus complet). -1 si l'information n'est pas disponible. -2 si vous n'avez pas les droits nécessaires.
	position: string; // Texte qui indique la position du véhicule. Ex:'Le véhicule est actuellement entre les stations Voirin et Gibelotte sur la ligne L3 Direction Pôle Temis par Gare Viotte et Campus' ou 'Le véhicule n'est actuellement pas localisable avec précision' ou vide '' si vous n'avez pas les droits.
}
