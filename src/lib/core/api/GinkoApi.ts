import type {
	Affluence,
	Arret,
	EtatLigne,
	Ligne,
	Message,
	TempsLieu,
	VehiculeDR,
	VehiculeTR
} from '$core/dto/ginko';
import { GINKO_API_KEY } from '$env/static/private';

// Helper to construct API URL with method and parameters
function apiUrl(method: string, params: Record<string, any> = {}) {
	const queryString = new URLSearchParams({
		apiKey: GINKO_API_KEY,
		...params
	}).toString();

	return `https://api.ginko.voyage/${method}.do?${queryString}`;
}

// Helper to make API calls and parse response
async function apiCall<T>(method: string, params: Record<string, any> = {}): Promise<T> {
	const url = apiUrl(method, params);
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`API call failed: [${method}] (${response.status})`);
	}

	const data = await response.json();
	return data.objets as T;
}

// DR: Données référentielles

export async function getArrets(): Promise<Arret[]> {
	return apiCall<Arret[]>('DR/getArrets'); // Ne pas toucher à ça
}

export async function getLignes(): Promise<Ligne[]> {
	return apiCall<Ligne[]>('DR/getLignes'); // Ne pas toucher à ça
}

// Liste des arrêts desservis par cette variante de ligne, dans l'ordre géographique (le premier arrêt est le terminus de départ, le dernier arrêt le terminus d'arrivée).
export async function getDetailsVariante(params: {
	idLigne: string;
	idVariante: string;
}): Promise<Arret[]> {
	return apiCall<Arret[]>('DR/getDetailsVariante', params);
}

// Récupère la liste des lignes et sens qui desservent un arrêt
export async function getVariantesDesservantArret(params: { idArret: string }): Promise<Ligne[]> {
	return apiCall<Ligne[]>('DR/getVariantesDesservantArret', params);
}

// Retourne la liste des arrêts de bus et tram situés à proximité de la position fournie
export async function getArretsProches(params: {
	latitude: number;
	longitude: number;
}): Promise<Arret[]> {
	return apiCall<Arret[]>('DR/getArretsProches', params);
}

// Retourne les détails d'un arrêt à partir de son identifiant
export async function getDetailsArret(params: { id: string }): Promise<Arret> {
	return apiCall<Arret>('DR/getDetailsArret', params);
}

// Récupérer les détails d'un véhicule
export async function getDetailsVehicule_DR(params: { num: number }): Promise<VehiculeDR> {
	return apiCall<VehiculeDR>('DR/getDetailsVehicule', params);
}

// TR: Temps Réel

// Récupère les temps d'attente pour un lieu ou un arrêt
export async function getTempsLieu(params: {
	nom?: string; // Nom de l'arrêt (ex: "Ile de France" pour avoir les arrêts ressemblant à "Ile de France")
	idArret?: string; // Identifiant de l'arrêt (ex: "ARRET_1" pour avoir les temps d'attente de l'arrêt précis)
	nb?: number; // Nombre de temps d'attente par ligne/sens maximum à retourner (par défaut 2, max 5)
}): Promise<TempsLieu> {
	return apiCall<TempsLieu>('TR/getTempsLieu', params);
}

// Récupérer un ensemble de temps d'attente
export async function getListeTemps(params: {
	listeNoms: string[];
	listeIdLignes?: string[];
	listeSensAller: boolean[];
	preserverOrdre?: boolean;
	nb?: number;
}): Promise<TempsLieu[]> {
	return apiCall<TempsLieu[]>('TR/getListeTemps', params);
}

// Retourne une liste de ligne avec leur état en terme d'infotrafic
export async function getEtatLignes(): Promise<EtatLigne[]> {
	return apiCall<EtatLigne[]>('TR/getEtatLignes');
}

// Récupérer les infos-trafic du réseau Ginko
export async function getMessages(params: {
	idLignes?: string[];
	idVariantes?: string[];
}): Promise<Message[]> {
	return apiCall<Message[]>('TR/getMessages', params);
}

// Récupérer les info temps réel d'un véhicule
export async function getDetailsVehicule_TR(params: { num: number }): Promise<VehiculeTR> {
	return apiCall<VehiculeTR>('TR/getDetailsVehicule', params);
}

// Récupérer la prévision d'affluence (pas le temps réel)
export async function getAffluence(params: {
	idArret: string;
	date: string; // Format YYYY-MM-DD
	idLigne: string;
	sensAller: boolean;
}): Promise<Affluence> {
	return apiCall<Affluence>('Affluence/get.do', params);
}
