import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
	providedIn: 'root',
})
export class HubService {
	private static hubConnection: HubConnection;
	private static joinGameCallbacks: ((isSuccess: boolean, message: string) => any)[] = [];
	private static listGamersCallbacks: ((gamers: string[]) => any)[] = [];
	private static getSudokuCallbacks: ((sudoku: number[][]) => any)[] = [];

	private static connectToHub()
	{
		if (this.hubConnection)
		{
			return;
		}

		this.hubConnection = new HubConnectionBuilder().withUrl("http://localhost:51255/sudokuHub").build();

		this.hubConnection.start()
			.then(() =>
			{
				console.log('Connection started!');

				this.hubConnection.on("JoinGame",
					(isSuccess: boolean, message: string) =>
					{
						this.joinGameCallbacks.forEach((value) =>
						{
							value(isSuccess, message);
						});
					});

				this.hubConnection.on("ListGamers",
					(gamers: string[]) =>
					{
						this.listGamersCallbacks.forEach((value) =>
						{
							value(gamers);
						});
					});

				this.hubConnection.on("GetSudoku",
					(sudoku: number[][]) =>
					{
						this.getSudokuCallbacks.forEach((value) =>
						{
							value(sudoku);
						});
					});
			})
			.catch(err =>
			{
				console.log('Error while establishing connection');
				this.reconnectToHub();
			});
	}

	private static reconnectToHub()
	{
		setTimeout(() =>
			{
				this.connectToHub();
			},
			3000);
	}

	static startConnection()
	{
		this.connectToHub();
	}

	static getConnection()
	{
		this.connectToHub();
		return this.hubConnection;
	}

	static joinGame(name: string)
	{
		this.hubConnection.invoke("JoinGame", name);
	}

	static onJoinGame(callback: (isSuccess: boolean, message: string) => any)
	{
		this.joinGameCallbacks.push(callback);
	}

	static onListGamers(callback: (gamers: string[]) => any)
	{
		this.listGamersCallbacks.push(callback);
	}

	static onGetSudoku(callback: (sudoku: number[][]) => any)
	{
		this.getSudokuCallbacks.push(callback);
	}
}