export interface PrevisionAffluence {
	heureDeDebut: string; // Heure de début de mesure de l'affluence
	heureDeFin: string; // Heure de fin de mesure de l'affluence
	affluence: number; // Indique l'affluence de ce créneau horaire, de -1 à 2. 0 Faible - il y a peu de voyageurs à bord des véhicules 1 Modérée -il y a déjà quelques voyageurs à bord des véhicules: il reste sûrement quelques places assises! 2 Forte - il y a déjà beaucoup de voyageurs à bord des véhicules: il n’y a probablement plus de places assises. -1 :Indisponible - Il est impossible de connaitre l’affluence pour ce créneau
	texteAffluence: string; // Texte qui décrit l'affluence pour les usagers. Exemple, si affluence vaut 0, le texte pourrait être : 'Il y a peu de voyageurs à bord des véhicules lors de ce créneau horaire'
	nbPassagersABord: number; // Indique une moyenne du nombre de passagers à bord des véhicules. -1 si l'information n'est pas disponible. -2 :Vous n'avez pas les droits aux informations d'affluences. Contactez-nous
	tauxDeCharge: number; // Taux en % qui indique comment les véhicules sont remplis en fonction de leur capacité. -1 si l'information n'est pas disponible. -2 :Vous n'avez pas les droits aux informations d'affluences. Contactez-nous
}
