export interface VehiculeDR {
	num: string;
	affichageDynamique: boolean;
	annoncesSonores: boolean;
	climatisation: boolean;
	prisesUSB: boolean;
	accessiblite: number;
	energie: number;
	typeVehicule: string;
}

export interface VehiculeTR {
	num: string;
	affluence: number;
	texteAffluence: string;
	nbPassagersABord: number;
	tauxDeCharge: number;
	position: string;
}
