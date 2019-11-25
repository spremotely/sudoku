import { Component, Input } from '@angular/core';
import { GameService } from "./../services/game.service";
import { User } from "./../models/models";

@Component({
	selector: 'top',
	styleUrls: ['top.css'],
	templateUrl: 'top.html'
})
export class TopComponent {
	@Input()
	top: User[];

	constructor(private gameService: GameService) {
	}

	ngOnInit()
	{
		this.gameService.getTop();
	}
}