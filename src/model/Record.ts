import {Coordinate} from "./Coordinate";

export type Record = {
	RecordId: string;
	InspectionType: 'FIR' | 'FQI' | 'RI';
	Estate: string;
	Block: string;
	Inspector: string;
	DateTime: Date;
	Coordinates: Coordinate[];
	// other properties
};
