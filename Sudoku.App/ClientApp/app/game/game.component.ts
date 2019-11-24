import { Component } from '@angular/core';
import { GameService } from './../services/game.service';
import { StorageService } from './../services/storage.service';

@Component({
	selector: 'game',
	styleUrls: ['game.css'],
	templateUrl: 'game.html'
})
export class GameComponent {
	joinedToGame: boolean;

	constructor(private gameService: GameService, private storageService: StorageService)
	{
		this.joinedToGame = storageService.get("GameComponent.joinedToGame");

		gameService.joinStatus.subscribe((value) =>
		{
			this.joinedToGame = value.isSuccess;
			storageService.add("GameComponent.joinedToGame", this.joinedToGame);
		});
	}
}