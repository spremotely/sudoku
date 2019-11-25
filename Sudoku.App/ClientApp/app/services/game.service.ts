import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { SudokuNumber, User } from './../models/models';

@Injectable({
	providedIn: 'root',
})
export class GameService {
	private connection: HubConnection = undefined;

	user = new Subject<User>();
	gamers = new Subject<string[]>();
	sudoku = new Subject<number[][]>();
	number = new Subject<SudokuNumber>();
	status = new Subject<string>();
	winner = new Subject<User>();
	top = new Subject<User[]>();

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
			(user: User) =>
			{
				this.user.next(user);
				this.listGamers();
				this.getSudoku();
				this.gameStatus();
			});

		this.connection.on("ListGamers",
			(gamers: string[]) =>
			{
				this.gamers.next(gamers);
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
				this.gameStatus();
			});

		this.connection.on("GameStatus",
			(status: string) =>
			{
				this.status.next(status);
				if (status === "Solved")
				{
					this.getWinner();
				}
			});

		this.connection.on("GetWinner",
			(winner: User) =>
			{
				this.winner.next(winner);
			});

		this.connection.on("GetTop",
			(top: User[]) =>
			{
				this.top.next(top);
			});

		this.connection.on("UpdateTop",
			(top: User[]) =>
			{
				this.top.next(top);
			});
	}

	joinGame(userName: string)
	{
		this.connection.invoke("JoinGame", userName);
	}

	addNumber(row: number, column: number, value: number)
	{
		this.connection.invoke("AddNumber", row, column, value);
	}

	newGame()
	{
		this.connection.invoke("NewGame");
	}

	listGamers()
	{
		this.connection.invoke("ListGamers");
	}

	getSudoku()
	{
		this.connection.invoke("GetSudoku");
	}

	gameStatus()
	{
		this.connection.invoke("GameStatus");
	}

	getWinner()
	{
		this.connection.invoke("GetWinner");
	}

	getTop()
	{
		this.connection.invoke("GetTop");
	}
}