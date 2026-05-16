export interface Variante {
	id: string;
	destination: string;
	precisionDestination: string;
	sensAller: boolean;
}

export interface Ligne {
	id: string;
	numLignePublic: string;
	libellePublic: string;
	couleurFond: string;
	couleurTexte: string;
	modeTransport: number;
	typologie: number;
	scolaire: boolean;
	periurbain: boolean;
	variantes: Variante[];
}

export interface EtatLigne {
	idLigne: string;
	numLignePublic: string;
	couleurFond: string;
	couleurTexte: string;
	etat: number;
}
