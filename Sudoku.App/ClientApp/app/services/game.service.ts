import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { JoinStatus } from './../models/models';

@Injectable({
	providedIn: 'root',
})
export class GameService {
	private connection: HubConnection = undefined;

	joinStatus = new Subject<JoinStatus>();
	users = new Subject<string[]>();

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
	}

	joinGame(username: string)
	{
		this.connection.invoke("JoinGame", username);
	}
}