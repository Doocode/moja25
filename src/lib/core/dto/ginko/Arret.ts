export interface Arret {
	id: string;
	nom: string;
	latitude: number;
	longitude: number;
	accessibilite: number; // (Ajouté le 24/05/2018) Indique si l'arrêt est accessible aux personnes à mobilité réduite et aménagé pour permettre leur embarquement/débarquement dans les véhicules (bande d'éveil de vigilance, quai réhaussé). 0: Aucune information n'est disponible. 1: Arrêt accessible. 2: Arrêt difficilement accessible ou non accessible. Attention, même si l'arrêt est accessible, tous les véhicules qui le desservent ne le sont pas forcément (reportez-vous au champ accessibiliteVehicule de l'objet FormTempsAttente).
	intemperie: boolean; // Indique si l'arrêt est impacté ou non lorsque le plan "intempéries" est déclenché.
}

export interface FormattedArret extends Arret {
	nomDecoupe?: { ville: string; station: string };
	childrenIds?: string[];
	hasParent?: boolean;
	children?: FormattedArret[];
}
