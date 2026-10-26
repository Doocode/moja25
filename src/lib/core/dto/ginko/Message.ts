export interface Message {
	id: number;
	titre: string; // Titre de l'information. Peut contenir de l'HTML / CSS. Jamais vide.
	texte: string; // Contenu de l'information pour un support Web, avec de HTML / CSS. Jamais vide.
	url: string; // URL d'une page du site ginko.voyage sur laquelle des informations complémentaires sont disponibles. On pourra voir sur cette page tous les messages d'une même campagne (cf. idCampagne) Peut être une chaîne vide.
	etat: number; /* Etat de la ligne en terme d'info trafic 
		1 : Aucune perturbation
		2 : Information concernant la (ou les) ligne(s) (nouveauté, évolution)
		4 : Une perturbation est prévue dans le futur
		5 : Une perturbation est en cours
		6 : La circulation de la (ou des) ligne(s) est interrompue (totalement)
	*/
	idEvenement: number; // Identifiant de l'évènement qui regroupe plusieurs messages. Peut être utiliser pour afficher sur une même page, tous les messages liés par un même évenement.
	lignes: string[]; // Tableau de numéro de ligne. Liste des lignes concernées par cette info-trafic, triée par ordre logique d'affichage. Cette liste n'est jamais vide, mais elle peut ne contenir qu'un seul élément.
	arrets: string[]; // Tableau d'id arrêt. Si le tableau est vide le message est à diffuser sur toutes les lignes de la liste 'lignes', sinon l'information n'est à diffuser que sur les arrets dont l'id est dans cette liste. (Ne concerne pas les supports WEB)
	supports: number[]; /* Listes des supports de diffusion du message. Sans droit supplémentaire, seuls les messages de type 'Web' apparaissent
		1 => borne info voyageur
		2 => écran embarqué
		3 => web
		4 => notification
		5 => mail
	*/
}
