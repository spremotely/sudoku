import { Component, Input } from '@angular/core';
import { GameService } from './../../services/game.service';
import { User } from "./../../models/models";

@Component({
	selector: 'end',
	styleUrls: ['end.css'],
	templateUrl: 'end.html'
})
export class EndComponent {

	@Input()
	status: string;

	@Input()
	winner: User;

	constructor(private gameService: GameService)
	{
	}

	onNewGame()
	{
		this.gameService.newGame();
		this.gameService.getSudoku();
		this.gameService.gameStatus();
	}
}