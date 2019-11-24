import { Component } from '@angular/core';
import { GameService } from './../../services/game.service';
import { StorageService } from './../../services/storage.service';

@Component({
	selector: 'users',
	styleUrls: ['users.css'],
	templateUrl: 'users.html'
})
export class UsersComponent {
	username: string;
	gamers: string[];

	constructor(private gameService: GameService, private storageService: StorageService)
	{
		this.username = storageService.get("username");
		this.gamers = storageService.get("UsersComponent.gamers");

		gameService.users.subscribe((value) =>
		{
			this.gamers = value;
			storageService.add("UsersComponent.gamers", this.gamers);
		});
	}
}