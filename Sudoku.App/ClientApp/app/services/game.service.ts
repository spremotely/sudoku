import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { JoinStatus } from './../models/models';
import { SudokuNumber } from './../models/models';

@Injectable({
	providedIn: 'root',
})
export class GameService {
	private connection: HubConnection = undefined;

	joinStatus = new Subject<JoinStatus>();
	users = new Subject<string[]>();
	sudoku = new Subject<number[][]>();
	number = new Subject<SudokuNumber>();

	constructor()
	{
		this.init();
	}

	private init()
	{
		if (this.connection)
		{
			return;
		}

		this.connection = new HubConnectionBuilder().withUrl("http://localhost:51255/sudokuHub").build();
		this.connection.start().catch(err => console.error(err.toString()));

		this.connection.on("JoinGame",
			(joinStatus: JoinStatus) =>
			{
				this.joinStatus.next(joinStatus);
			});

		this.connection.on("ListGamers",
			(gamers: string[]) =>
			{
				this.users.next(gamers);
			});

		this.connection.on("GetSudoku",
			(sudoku: number[][]) =>
			{
				this.sudoku.next(sudoku);
			});

		this.connection.on("AddNumber",
			(number: SudokuNumber) =>
			{
				this.number.next(number);
			});
	}

	joinGame(username: string)
	{
		this.connection.invoke("JoinGame", username);
	}

	addNumber(row: number, column: number, value: number)
	{
		this.connection.invoke("AddNumber", row, column, value);
	}
}