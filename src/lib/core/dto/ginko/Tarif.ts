export interface Tarif {
	type: number; // Type de titre de transport. Vaut 0 pour un titre au voyage, 1 pour un abonnement mensuel et 2 pour un abonnement annuel.
	libelle: string; // Nom commercial du titre de transport.
	description: string; // Description complète et conditions d'utilisation.
	pointsDeVente: string; // Points de vente où les clients peuvent se procurer ce titre de transport.
	tarif: number; // Prix TTC en euros.
}
