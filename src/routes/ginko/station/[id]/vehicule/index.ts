import FeatureBubble from './FeatureBubble.svelte';
import FeatureRow from './FeatureRow.svelte';

export { FeatureBubble, FeatureRow };

export interface NomRameTramway {
	name: string;
	num: number;
	anchor?: string;
}

export const pageNomRames =
	'https://www.ginko.voyage/decouvrir-visiter/les-coulisses-du-reseau-ginko/les-personnages-des-rames-de-tram';

export const nomRamesTramway: NomRameTramway[] = [
	// CAF Urbos 3 (22 meters with 3 modules)
	{ num: 801, name: 'Victor HUGO', anchor: 'c4550' },
	{ num: 802, name: 'Auguste et Louis LUMIÈRE', anchor: 'c4538' },
	{ num: 803, name: 'Colette', anchor: 'c4530' },
	{ num: 804, name: 'Louis PASTEUR', anchor: 'c4544' },
	{ num: 805, name: "Marquis de Jouffroy d'ABBANS", anchor: 'c4557' },
	{ num: 806, name: 'Marquis de VAUBAN', anchor: 'c4565' },
	{ num: 807, name: 'Gustave COURBET', anchor: 'c4532' },
	{ num: 808, name: 'Jeanne-Antide THOURET', anchor: 'c4563' },
	{ num: 809, name: 'Rouget DE LISLE', anchor: 'c4561' },
	{ num: 810, name: 'Marie CURIE', anchor: 'c4540' },
	{ num: 811, name: 'Claude-Nicolas LEDOUX', anchor: 'c4559' },
	{ num: 812, name: 'Nicole BONVALOT', anchor: 'c4568' },
	{ num: 813, name: 'Pierre-Joseph PROUDHON', anchor: 'c4548' },
	{ num: 814, name: 'Charles FOURIER', anchor: 'c4556' },
	{ num: 815, name: 'Toussaint LOUVERTURE', anchor: 'c4571' },
	{ num: 816, name: 'Louis PERGAUD', anchor: 'c4546' },
	{ num: 817, name: 'Léonel DE MOUSTIER', anchor: 'c4542' },
	{ num: 818, name: "Jenny d'HÉRICOURT", anchor: 'c4534' },
	{ num: 819, name: 'Henri FERTET', anchor: 'c4528' },

	// Alstom Citadis 305 (33 meters with 5 modules)
	{ num: 901, name: 'Odile SELB-BOGÉ', anchor: 'c4417' },
	{ num: 902, name: 'Germaine TILLION', anchor: 'c4415' },
	{ num: 903, name: 'Claude LORIUS', anchor: 'c4440' },
	{ num: 904, name: 'Denise LORACH', anchor: 'c4418' },
	{ num: 905, name: 'Jean DE GRIBALDY', anchor: 'c4416' },
	{ num: 906, name: 'Camille CHARVET-KAHN', anchor: 'c4588' },
	{ num: 907, name: 'Lucette CROPPET', anchor: 'c4589' },
	{ num: 908, name: 'André RÉGANI', anchor: 'c4590' }
];
