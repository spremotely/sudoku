import { Injectable } from '@angular/core';
import { HubService } from './../services/hub.service';

@Injectable({
	providedIn: 'root',
})
export class GameService {
	private static isInitialized = false;

	static isJoined = false;
	static message: string;
	static gamers: string[] = [];
	static sudoku: number[][] = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
	static selected: number[] = [0, 0];

	static init()
	{
		if (this.isInitialized)
		{
			return;
		}

		HubService.startConnection();

		HubService.onJoinGame((isSuccess: boolean, message: string) =>
		{
			this.isJoined = isSuccess;
			this.message = message;
		});

		HubService.onListGamers((gamers: string[]) =>
		{
			this.gamers = gamers;
		});

		HubService.onGetSudoku((sudoku: number[][]) =>
		{
			this.sudoku = sudoku;
		});
	}

	static join(username: string)
	{
		HubService.joinGame(username);
	}

	static onJoinGame(callback: (isSuccess: boolean, message: string) => any)
	{
		HubService.onJoinGame(callback);
	}

	static onListGamers(callback: (users: string[]) => any)
	{
		HubService.onListGamers(callback);
	}

	static onGetSudoku(callback: (sudoku: number[][]) => any)
	{
		HubService.onGetSudoku(callback);
	}
}