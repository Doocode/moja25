export interface Message {
	id: number;
	titre: string;
	texte: string;
	url: string;
	etat: number;
	idEvenement: number;
	lignes: string[];
	arrets: string[];
	supports: number[];
}
