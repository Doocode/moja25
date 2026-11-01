export interface Variante {
	id: string;
	destination: string; // Destination de la variante, affichable à l'utilisateur. Correspond en général au nom du terminus d'arrivée de la variante. Par exemple 'Chalezeule'
	precisionDestination: string; // Précisions sur l'itinéraire emprunté pour rejoindre la destination. La plupart du temps, ce champ est une chaine vide. Il est utilisé pour certaines variantes qui effectuent un crochet dans leur itinéraire pour desservir un point d'attraction particulier à certaines heures de la journée. Par exemple 'Par Piscine/Patinoire'
	sensAller: boolean; // Indique le sens de circulation des véhicules qui suivent cette variante. Par convention, pour les lignes qui traversent Besançon de part en part, le sens Aller est utilisé en direction de l'Est, et le sens Retour en direction de l'Ouest. Vous aurez rarement besoin de cette information. true: variante en sens Aller false: variante en sens Retour
}

export interface Ligne {
	id: string;
	numLignePublic: string; // Numéro de ligne, affichable à l'utilisateur. Par exemple "1".
	libellePublic: string; // Description de la ligne, affichable à l'utilisateur. Par exemple "Hauts-du-Chazal <> Chalezeule".
	modeTransport: number; // Type de véhicule. Par exemple 0 pour bus, 1 pour tram
	couleurFond: string; // Couleur d'arrière-plan caractéristique de la ligne (utilisée sur tous les documents et affichages dynamiques). Format HTML, sans le '#'.
	couleurTexte: string; // Couleur de texte caractéristique de la ligne (utilisée sur tous les documents et affichages dynamiques). En général blanc ou noir. Format HTML, sans le '#'.
	variantes: Variante[]; // Chaque ligne est composée de plusieurs variantes. La plupart des lignes en contiennent deux: une pour chaque sens de circulation. Toutefois, certaines lignes peuvent en contenir plus, lorsqu'un ou plusieurs arrêts sont desservis seulement à certaines heures de la journée. Attention, si vous avez obtenu cet objet en réponse à la requête DR/getVariantesDesservantArret, seules les variantes de lignes desservant l'arrêt demandé sont présentes dans la liste.
	periurbain: boolean; // Indique s'il s'agit d'une ligne périurbaine. Les lignes périurbaines relient les villages situés dans le Grand Besançon aux Pôles d'Echange Intermodaux (PEI).
	scolaire: boolean; // Indique s'il s'agit d'une ligne conçue spécialement pour les transports scolaires (collèges et lycées).
	typologie: number; /*
	Permet de classer les lignes selon leur typologie. Le numéro permet également de les trier dans un ordre d'importance
	- 10 "Tramway (T1 / T2)"
	- 20 "LIANES (L3 à L6)" - 30 "Lignes urbaines (7 à 12 + Ginko Citadelle + PLAN.B)"
	- 40 "Lignes complémentaires (20 à 24)
	- 50 "Lignes périurbaines (51 à 87 + Ginko Osselle Plage + Ginko Piscine + Ginko Chailluz)"
	- 60 "Lignes scolaires (Diabolo)"
	- 70 "Services à la demande (Ginko Proxi, Ginko Proxi TGV, Ginko Hôpital, Ginko Cliniques, Ginko Gare)"
	- 80 "Autre"
	*/
}
