export enum EtatLigne {
	Aucune_info = 0, // Pas de couleur ni de picto (ex: lignes TAD)
	Normal = 1, // Vert (check)
	Information = 2, // Bleu (info)
	Hors_service = 3, // Gris (croix) - ne fonctionne pas selon sa période de fonctionnement
	Perturbation_future = 4, // Gris (attention)
	Perturbation_en_cours = 5, // Orange (attention)
	Circulation_interrompue = 6 // Rouge (croix)
}

export enum Etat {
	Aucune_perturbation = 1, // Aucune perturbation
	Information_réseau = 2, // Information concernant la (ou les) ligne(s) (nouveauté, évolution)
	Perturbation_future = 4, // Une perturbation est prévue dans le futur
	Perturbation_en_cours = 5, // Une perturbation est en cours
	Circulation_interrompue = 6 // La circulation de la (ou des) ligne(s) est interrompue (totalement)
}
