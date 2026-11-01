// Etat de la ligne en terme d'info trafic
export interface InfoLigne {
	idLigne: string;
	numLignePublic: string;
	couleurFond: string; // Couleur d'arrière-plan caractéristique de la ligne (utilisée sur tous les documents et affichages dynamiques). Format HTML, sans le '#'.
	couleurTexte: string; // Couleur de texte caractéristique de la ligne (utilisée sur tous les documents et affichages dynamiques). En général blanc ou noir. Format HTML, sans le '#'.
	etat: number; /*
	- 0 "Pas de couleur (pas de picto) - pas d'info sur l'état. Exemple pour les lignes TAD"
	- 1 "Vert (picto check) - La ligne fonctionne normalement (aucune perturbation en cours ni prévue)"
	- 2 "Bleu (picto info) - Il y a une information concernant la ligne (nouveauté, évolution)"
	- 3 "Gris (picto croix) - La ligne ne fonctionne pas en ce moment, selon sa période de fonctionnement"
	- 4 "Gris (picto attention) - Une perturbation est prévue dans le futur"
	- 5 "Orange (picto attention) - Une perturbation est en cours"
	- 6 "Rouge (picto croix) - La circulation de la ligne est interrompue (totalement)"
	*/
}
