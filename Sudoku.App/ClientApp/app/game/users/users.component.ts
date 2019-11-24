import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
	selector: 'users',
	styleUrls: ['users.css'],
	templateUrl: 'users.html'
})
export class UsersComponent {
	gamers: string[] = [];

	constructor(private gameService: GameService)
	{
		gameService.users.subscribe((value) =>
		{
			this.gamers = value;
		});
	}
}