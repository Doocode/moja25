import { VelociteSortField } from '$core/enum/VelociteSortField';

export const countFilters = [
	VelociteSortField.TOTAL_BIKES,
	VelociteSortField.MECHANICAL_BIKES,
	VelociteSortField.ELECTRICAL_BIKES,
	VelociteSortField.AVAILABLE_STANDS,
	VelociteSortField.UNAVAILABLE_STANDS
];

export const numberFilters = [VelociteSortField.NUMBER, VelociteSortField.CAPACITY];

export const statusFilters = [
	VelociteSortField.BONUS,
	VelociteSortField.BANKING
	/*VelociteSortField.OPEN,
    VelociteSortField.CONNECTED*/
];
