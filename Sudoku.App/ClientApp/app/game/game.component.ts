import { Component } from '@angular/core';
import { GameService } from './../services/game.service';

@Component({
	selector: 'game',
	styleUrls: ['game.css'],
	templateUrl: 'game.html'
})
export class GameComponent {
	joinedToGame: boolean = false;

	constructor(private gameService: GameService)
	{
		gameService.joinStatus.subscribe((value) =>
		{
			this.joinedToGame = value.isSuccess;
		});
	}
}