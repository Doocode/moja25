import {
	ArrowDownAZ,
	Ban,
	Bike,
	Check,
	CreditCard,
	Footprints,
	Hash,
	Layers,
	SquareLetterP,
	Star,
	Wifi,
	Zap
} from '@lucide/svelte';
import type { Component } from 'svelte';
import { VelociteSortField } from '$core/enum/VelociteSortField';

// Max value for the medium level threshold (orange) in count indicators
export const MEDIUM_LEVEL_THRESHOLD = 3;

export interface SortFieldConfig {
	label: string;
	shortLabel?: string; // Short label for grid display
	icon: Component<{ class?: string; size?: number }>;
	isText?: boolean;
}

export const FIELD_CONFIG: Record<VelociteSortField, SortFieldConfig> = {
	[VelociteSortField.NAME]: { label: 'Nom', icon: ArrowDownAZ, isText: true },
	[VelociteSortField.TOTAL_BIKES]: { label: 'Vélos disponibles', shortLabel: 'Vélos', icon: Bike },
	[VelociteSortField.AVAILABLE_STANDS]: {
		label: 'Places disponibles',
		shortLabel: 'Places',
		icon: SquareLetterP
	},
	[VelociteSortField.CAPACITY]: { label: 'Capacité', icon: Layers },
	[VelociteSortField.NUMBER]: { label: 'Numéro', icon: Hash },
	[VelociteSortField.MECHANICAL_BIKES]: { label: 'Vélos mécaniques', icon: Footprints },
	[VelociteSortField.ELECTRICAL_BIKES]: { label: 'Vélos électriques', icon: Zap },
	[VelociteSortField.UNAVAILABLE_STANDS]: { label: 'Places non-disponibles', icon: Ban },
	[VelociteSortField.BONUS]: { label: 'Bonus', icon: Star },
	[VelociteSortField.BANKING]: { label: 'Carte bancaire', icon: CreditCard },
	[VelociteSortField.OPEN]: { label: 'Ouvert', icon: Check },
	[VelociteSortField.CONNECTED]: { label: 'Connecté', icon: Wifi }
};

export enum StationColorStatus {
	Danger = 'velocite-station--danger',
	Warning = 'velocite-station--warning',
	Success = 'velocite-station--success',
	Neutral = 'velocite-station--neutral'
}

export function getStationColorStatus(value: number | boolean | string, field: VelociteSortField) {
	if (typeof value === 'number') {
		if (field === VelociteSortField.UNAVAILABLE_STANDS) {
			if (value <= 0) return StationColorStatus.Success;
			if (value <= MEDIUM_LEVEL_THRESHOLD) return StationColorStatus.Warning;
			return StationColorStatus.Danger;
		} else {
			if (value <= 0) return StationColorStatus.Danger;
			if (value <= MEDIUM_LEVEL_THRESHOLD) return StationColorStatus.Warning;
			return StationColorStatus.Success;
		}
	}
	return StationColorStatus.Neutral;
}
