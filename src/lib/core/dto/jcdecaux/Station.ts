import { type Position, type Stands } from '.';

export interface Station {
	number: number;
	name: string;
	address: string;
	position: Position;
	banking: boolean;
	bonus: boolean;
	status: string;
	connected: boolean;
	overflow: boolean;
	contractName: string;
	lastUpdate: number;
	totalStands: Stands;
	mainStands: Stands;
}
