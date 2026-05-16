import {
	ArrowDownAZ,
	Ban,
	Bike,
	Check,
	CreditCard,
	Hash,
	Layers,
	SquareParking,
	Star,
	Wifi,
	Zap
} from '@lucide/svelte';
import type { Component } from 'svelte';
import { VelociteSortField } from '$core/enum/VelociteSortField';

export interface SortFieldConfig {
	label: string;
	shortLabel?: string; // Libellé court pour l'affichage en grille
	Icon: Component<{ class?: string; size?: number }>;
	isText?: boolean;
}

export const FIELD_CONFIG: Record<VelociteSortField, SortFieldConfig> = {
	[VelociteSortField.NAME]: { label: 'Nom', Icon: ArrowDownAZ, isText: true },
	[VelociteSortField.TOTAL_BIKES]: { label: 'Vélos disponibles', shortLabel: 'Vélos', Icon: Bike },
	[VelociteSortField.AVAILABLE_STANDS]: {
		label: 'Places disponibles',
		shortLabel: 'Places',
		Icon: SquareParking
	},
	[VelociteSortField.CAPACITY]: { label: 'Capacité', Icon: Layers },
	[VelociteSortField.NUMBER]: { label: 'Numéro', Icon: Hash },
	[VelociteSortField.MECHANICAL_BIKES]: { label: 'Vélos mécaniques', Icon: Bike },
	[VelociteSortField.ELECTRICAL_BIKES]: { label: 'Vélos électriques', Icon: Zap },
	[VelociteSortField.UNAVAILABLE_STANDS]: { label: 'Places indisponibles', Icon: Ban },
	[VelociteSortField.BONUS]: { label: 'Bonus', Icon: Star },
	[VelociteSortField.BANKING]: { label: 'Carte bancaire', Icon: CreditCard },
	[VelociteSortField.OPEN]: { label: 'Ouvert', Icon: Check },
	[VelociteSortField.CONNECTED]: { label: 'Connecté', Icon: Wifi }
};

// Section 1 : champs de tri principaux
export const PRIMARY_FIELDS = [
	VelociteSortField.NAME,
	VelociteSortField.TOTAL_BIKES,
	VelociteSortField.AVAILABLE_STANDS,
	VelociteSortField.CAPACITY
] as const;

// Section 2 : décomptes numériques
export const COUNT_FIELDS = [
	VelociteSortField.NUMBER,
	VelociteSortField.MECHANICAL_BIKES,
	VelociteSortField.ELECTRICAL_BIKES,
	VelociteSortField.UNAVAILABLE_STANDS
] as const;

// Section 3 : statuts booléens
export const STATUS_FIELDS = [
	VelociteSortField.BONUS,
	VelociteSortField.BANKING,
	VelociteSortField.OPEN,
	VelociteSortField.CONNECTED
] as const;
