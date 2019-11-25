export interface SudokuNumber {
	row: number;
	column: number;
	value: number;
}

export interface User {
	guid: string;
	name: string;
	wins: number;
}