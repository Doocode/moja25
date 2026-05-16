import { type Station } from '.';

export interface FormattedStation extends Station {
	formattedName: string;
	// TODO: ajouter un champ "unavailableStands" calculé à partir de totalStands.capacity - mainStands.availabilities.bikes - mainStands.availabilities.stands
}
