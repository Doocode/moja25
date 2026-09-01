// Normalise une chaîne : supprime les accents et met en minuscule
export function normalize(str: string): string {
	return str
		.normalize('NFD') // Décompose les caractères accentués en caractère de base + diacritique (ex: "é" → "e" + "´")
		.replace(/[\u0300-\u036f]/g, '') // Supprime les diacritiques (accents, cédilles, trémas…)
		.toLowerCase();
}
