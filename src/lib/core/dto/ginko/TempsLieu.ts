export interface Temps {
	idArret: string;
	latitude: number;
	longitude: number;
	idLigne: string;
	numLignePublic: string;
	couleurFond: string;
	couleurTexte: string;
	sensAller: boolean;
	destination: string;
	precisionDestination: string;
	temps: string;
	tempsHTML: string;
	tempsEnSeconde: number;
	typeDeTemps: number;
	alternance: boolean;
	tempsHTMLEnAlternance: string;
	fiable: boolean;
	numVehicule: string;
	accessibiliteArret: number;
	accessibiliteVehicule: number;
	affluence: number;
	texteAffluence: string;
	aideDecisionAffluence: string;
	tauxDeCharge: number;
	idInfoTrafic: number;
	modeTransport: number;
}

export interface TempsLieu {
	nomExact: string;
	listeTemps: Temps[];
	latitude: number;
	longitude: number;
}
