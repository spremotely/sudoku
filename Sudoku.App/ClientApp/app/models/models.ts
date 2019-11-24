export interface JoinStatus {
	isSuccess: boolean;
	errorMessage: string;
}

export interface SudokuNumber {
	row: number;
	column: number;
	value: number;
}