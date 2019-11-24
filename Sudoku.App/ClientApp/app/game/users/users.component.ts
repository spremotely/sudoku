import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
	selector: 'users',
	styleUrls: ['users.css'],
	templateUrl: 'users.html'
})
export class UsersComponent {
	gamers: string[] = [];

	constructor()
	{
		GameService.init();
		this.gamers = GameService.gamers;
	}

	ngOnInit()
	{
		GameService.onListGamers((users: string[]) =>
		{
			this.gamers = users;
		});
	}
}