import { Component } from '@angular/core';
import { GameService } from './../services/game.service';

@Component({
	selector: 'game',
	styleUrls: ['game.css'],
	templateUrl: 'game.html'
})
export class GameComponent {
	hasGameAccess = false;

	constructor()
	{
		GameService.init();
		this.hasGameAccess = GameService.isJoined;
	}

	ngOnInit()
	{
		GameService.onJoinGame((isSuccess: boolean, message: string) =>
		{
			this.hasGameAccess = isSuccess;
		});
	}
}